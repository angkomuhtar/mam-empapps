import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Box, CheckIcon, HStack, Image, Select, VStack} from 'native-base';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {isPointWithinRadius} from 'geolib';
import Loading from '@components/loading.component';
import moment from 'moment';
import Alert from '@components/alert.component';
import {
  useGetTodayQuery,
  useGetShiftQuery,
  useGetAbsenLocationQuery,
  useSetClockInMutation,
} from '@slices/clock.slice';
import {Quote} from '../../../applications/utils/Quote';
import {useFocusEffect} from '@react-navigation/native';
import {apiSlice} from '../../../applications/slices/api.slice';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import JailMonkey from 'jail-monkey';

const requestLocationPermission = async () => {
  try {
    if (Platform.OS == 'ios') {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (status === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            // console.log('Current position:', position);
          },
          error => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
};

const Absen = ({navigation}) => {
  let width = Dimensions.get('screen').width;
  let height = Dimensions.get('screen').height;
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedShift, setSelectedShift] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    type: 'error',
    title: 'sukses',
    message: '',
    quote: '',
    onOK: () => {
      setAlert({...alert, show: false});
    },
    onDissmiss: false,
  });
  const [trigger, {data: today, isLoading}] =
    apiSlice.endpoints.getToday.useLazyQuery();
  const {
    data: shift,
    isLoading: shiftLoading,
    error,
    isSuccess,
  } = useGetShiftQuery();
  const {data: ab_location, isLoading: locLoading} = useGetAbsenLocationQuery();
  const [setClockIn, {isLoading: postLoading}] = useSetClockInMutation();

  const getCurrent = () => {
    setLoading(true);
    const result = requestLocationPermission();
    result.then(res => {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position);
        },
        error => {
          setLocation(false);
          setLoading(false);
          Position = false;
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  };

  const CheckIn = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let loc = false;
        let location = '';

        ab_location.map(data => {
          let chekAvail = isPointWithinRadius(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            data.radius,
          );
          if (chekAvail) {
            loc = true;
            location = data.id;
          }
        });

        if (JailMonkey.trustFall()) {
          setAlert({
            show: true,
            type: 'error',
            title: 'Oops, Panik Gak.?',
            message: 'Device Anda Menggunakan Lokasi Palsu',
            onOK: () => {
              setAlert({show: false});
            },
          });
        } else {
          if (loc) {
            if (today) {
              console.log(today);
              setAlert({
                show: true,
                type: 'warning',
                title: 'Absen pulang',
                message: 'ingin melakukan absen pulang sekarang.?',
                onOK: () => {
                  setAlert({...alert, show: false});
                  setClockIn({
                    shift: today.work_hours_id,
                    type: 'out',
                    location: location,
                    time: moment().format('HH:mm:ss'),
                    date: today.date,
                  }).then(res => {
                    if (res.error) {
                      setAlert({
                        show: true,
                        type: 'error',
                        title: 'Data tidak lengkap',
                        message:
                          res.error.status == '422'
                            ? 'pilih jenis shift'
                            : 'terjadi kesalahan',
                        onOK: () => {
                          setAlert({show: false});
                        },
                      });
                    } else if (res.data.success) {
                      setAlert({
                        show: true,
                        type: 'success',
                        title: 'ABSEN Pulang berhasil',
                        message: false,
                        quote: Quote[Math.floor(Math.random() * Quote.length)],
                        onOK: () => {
                          setAlert({show: false});
                        },
                      });
                    }
                  });
                },
                onDissmiss: () => {
                  setAlert({show: false});
                },
              });
              // setClockIn({
              //   shift: today.work_hours_id,
              //   type: 'out',
              //   location: location,
              //   time: moment().format('HH:mm:ss'),
              //   date: moment().format('YYYY-MM-DD'),
              // }).then(res => {
              //   if (res.error) {
              //     setAlert({
              //       show: true,
              //       type: 'error',
              //       title: 'Data tidak lengkap',
              //       message:
              //         res.error.status == '422'
              //           ? 'pilih jenis shift'
              //           : 'terjadi kesalahan',
              //       onOK: () => {
              //         setAlert({show: false});
              //       },
              //     });
              //   } else if (res.data.success) {
              //     setAlert({
              //       show: true,
              //       type: 'success',
              //       title: 'ABSEN Pulang berhasil',
              //       message: false,
              //       quote: Quote[Math.floor(Math.random() * Quote.length)],
              //       onOK: () => {
              //         setAlert({show: false});
              //       },
              //     });
              //   }
              // });
            } else {
              setClockIn({
                shift: selectedShift,
                type: 'in',
                location: location,
                time: moment().format('HH:mm:ss'),
                date: moment().format('YYYY-MM-DD'),
              }).then(res => {
                if (res.error) {
                  setAlert({
                    show: true,
                    type: 'error',
                    title: 'Data tidak lengkap',
                    message:
                      res.error.status == '422'
                        ? 'pilih jenis shift'
                        : 'terjadi kesalahan',
                    onOK: () => {
                      setAlert({show: false});
                    },
                  });
                } else if (res.data.success) {
                  setAlert({
                    show: true,
                    type: 'success',
                    title: 'ABSEN Masuk berhasil',
                    message: false,
                    quote: Quote[Math.floor(Math.random() * Quote.length)],
                    onOK: () => {
                      setAlert({show: false});
                    },
                  });
                }
              });
            }
          } else {
            setAlert({
              show: true,
              type: 'warning',
              title: 'Diluar area',
              message: 'anda tidak berada dalam radius absen',
              onOK: () => {
                setAlert({show: false});
              },
            });
          }
        }
      },
      error => {
        setLocation({
          coords: {
            latitude: -0.450841,
            longitude: 117.14655,
          },
        });
        setLoading(false);
        Position = false;
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useFocusEffect(
    useCallback(() => {
      console.log('adb', JailMonkey.AdbEnabled());
      console.log('jaibroken', JailMonkey.canMockLocation());
      getCurrent();
      trigger();
    }, [navigation]),
  );

  return (
    <View className="flex-1 relative">
      {(postLoading || isLoading || loading || shiftLoading || locLoading) && (
        <Loading />
      )}
      <Alert
        visible={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        quote={alert.quote}
        onOk={alert.onOK}
        onDissmiss={alert.onDissmiss}
      />

      {location?.coords ? (
        <VStack className="flex-1 justify-between bg-white h-full">
          <View className="flex-1 relative items-center">
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{height: '100%', width: width}}
              showsUserLocation={true}
              showsMyLocationButton={true}
              region={{
                latitude: parseFloat(location.coords?.latitude),
                longitude: parseFloat(location.coords?.longitude),
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}>
              {ab_location?.map((data, key) => (
                <Circle
                  key={key}
                  center={{
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude),
                  }}
                  fillColor="rgba(243, 21, 89, .5)"
                  strokeColor="rgba(243, 21, 89, .5)"
                  radius={parseFloat(data.radius)}
                />
              ))}
            </MapView>
          </View>
          <VStack
            space={4}
            className="bottom-0 px-5 w-full bg-white rounded-t-lg pt-10 pb-10">
            <View>
              <Box>
                <Select
                  selectedValue={selectedShift}
                  accessibilityLabel="Pilih Shift"
                  placeholder="Pilih Shift"
                  isDisabled={today ? true : false}
                  fontFamily={'OpenSans-Bold'}
                  borderRadius={'full'}
                  dropdownIcon={<></>}
                  _selectedItem={{
                    endIcon: <CheckIcon size="5" />,
                  }}
                  onValueChange={itemValue => setSelectedShift(itemValue)}>
                  {shift &&
                    shift?.data.map((data, key) => (
                      <Select.Item
                        key={key}
                        fontFamily={'OpenSans-Bold'}
                        label={`${data.name} ( ${moment(
                          data.start,
                          'HH:mm:ss',
                        ).format('HH:mm')} - ${moment(
                          data.end,
                          'HH:mm:ss',
                        ).format('HH:mm')} ) (${data.shift_code})`}
                        value={data.id}
                      />
                    ))}
                </Select>
              </Box>
            </View>
            <HStack justifyContent={'center'} alignItems={'center'} space={20}>
              <VStack>
                <Text
                  className="text-xs text-primary-950"
                  style={{fontFamily: 'Inter-Bold'}}>
                  Absen Masuk
                </Text>
                <Text className="text-2xl font-bold font-sans text-primary-700 text-center">
                  {today?.clock_in
                    ? moment(today?.clock_in, 'HH:mm:ss').format('HH:mm')
                    : '--:--'}
                </Text>
              </VStack>
              <VStack>
                <Text
                  className="text-xs text-primary-950"
                  style={{fontFamily: 'Inter-Bold'}}>
                  Absen Pulang
                </Text>
                <Text className="text-2xl font-bold font-sans text-primary-700 text-center">
                  {today?.clock_out
                    ? moment(today?.clock_out, 'HH:mm:ss').format('HH:mm')
                    : '--:--'}
                </Text>
              </VStack>
            </HStack>
            <TouchableOpacity
              disabled={today?.clock_out && today?.clock_in ? true : false}
              onPress={() => CheckIn()}
              className={`w-full items-center p-4 rounded-md ${
                today?.clock_out ? 'bg-primary-200' : ' bg-primary-500'
              }`}>
              <Text className="font-bold text-white font-sans uppercase">
                {today ? 'Absen Pulang' : 'Absen Datang'}
              </Text>
            </TouchableOpacity>
          </VStack>
          <View className="py-9" />
        </VStack>
      ) : (
        <VStack className="flex-1 justify-center items-center bg-white h-full">
          <Image
            source={require('../../assets/images/error.png')}
            resizeMode="contain"
            alt="images"
            className="h-32"
          />
          <Text
            className="text-center text-primary-950 capitalize text-lg px-10"
            style={{fontFamily: 'Inter-Bold'}}>
            Maaf Kami Tidak dapat Menentukan lokasi anda
          </Text>
        </VStack>
      )}
    </View>
  );
};

export default Absen;
