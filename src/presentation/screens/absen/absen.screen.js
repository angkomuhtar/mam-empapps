import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  NativeModules,
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
import {Quote} from '../../../applications/utils/constant';
import {useFocusEffect} from '@react-navigation/native';
import {apiSlice} from '../../../applications/slices/api.slice';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNMockLocationDetector from 'react-native-mock-location-detector';
import {getVersion} from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import Layout from '../../components/layout.component';

const requestLocationPermission = async () => {
  try {
    if (Platform.OS == 'ios') {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
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

const checkMockLocation = async location => {
  if (Platform.OS === 'android') {
    const isMockLocation =
      await RNMockLocationDetector.checkMockLocationProvider();
    if (isMockLocation || location.mocked) {
      console.log('Mock location detected', location.mocked, isMockLocation);
      return true;
    } else {
      return false;
    }
  } else {
    console.log(location);
    if (location.mocked) {
      return true;
    }
    return false;
  }
};

const checkRadius = ({list_location, curr_location}) => {
  let result = {available: false, data: {}};
  list_location.map(data => {
    let chekAvail = isPointWithinRadius(
      {
        latitude: curr_location.coords.latitude,
        longitude: curr_location.coords.longitude,
      },
      {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      data.radius,
    );
    if (chekAvail) {
      result = {available: true, data: data};
    }
  });

  return result;
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
  const [setClockIn, {isLoading: postLoading, data: clockReturn}] =
    useSetClockInMutation();

  let version = getVersion();

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
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
      );
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  };

  const checkIn = async () => {
    if (selectedShift == '') {
      setAlert({
        show: true,
        type: 'warning',
        title: 'Pilih Shift',
        message: 'Silahkan pilih shift terlebih dahulu',
        onOK: () => {
          setAlert({show: false});
        },
      });
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        let mock = await checkMockLocation(position);
        let radius = checkRadius({
          list_location: ab_location,
          curr_location: position,
        });

        if (mock) {
          setAlert({
            show: true,
            type: 'danger',
            title: 'Oops, Tidak di izinkan.?',
            message: 'Terdapat aktifitas yang mencurigakan pada perangkat anda',
            onOK: () => {
              setAlert({show: false});
            },
          });
          return;
        }

        if (!radius.available) {
          setAlert({
            show: true,
            type: 'warning',
            title: 'Diluar area',
            message: 'anda tidak berada dalam radius absen',
            onOK: () => {
              setAlert({show: false});
            },
          });
          return;
        }

        setClockIn({
          shift: selectedShift,
          type: 'in',
          location: radius?.data?.id,
          time: moment().format('HH:mm:ss'),
          date: moment().format('YYYY-MM-DD'),
          version: version,
          platform: Platform.OS,
        }).then(res => {
          if (res.error) {
            const validationErrors = res.error.message;
            let errorMessage = '';
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                errorMessage += `${validationErrors[key].join('\n')}\n`;
              }
            }
            setAlert({
              show: true,
              type: 'error',
              title: 'Data tidak lengkap',
              message:
                res.error.status == '422' ? errorMessage : 'terjadi kesalahan',
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
      },
      error => {
        setLocation(false);
        setLoading(false);
        Position = false;
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    );
  };

  const checkOut = async location => {
    setAlert({
      show: true,
      type: 'warning',
      title: 'Absen pulang',
      message: 'ingin melakukan absen pulang sekarang.?',
      onOK: () => {
        setAlert({...alert, show: false});
        Geolocation.getCurrentPosition(
          async position => {
            let mock = await checkMockLocation(position);
            let radius = checkRadius({
              list_location: ab_location,
              curr_location: position,
            });
            if (mock) {
              setAlert({
                show: true,
                type: 'danger',
                title: 'Oops, Tidak di izinkan.?',
                message:
                  'Terdapat aktifitas yang mencurigakan pada perangkat anda',
                onOK: () => {
                  setAlert({show: false});
                },
              });
              return;
            }
            if (!radius.available) {
              setAlert({
                show: true,
                type: 'warning',
                title: 'Diluar area',
                message: 'anda tidak berada dalam radius absen',
                onOK: () => {
                  setAlert({show: false});
                },
              });
              return;
            }
            setClockIn({
              shift: today.work_hours_id,
              type: 'out',
              location: radius?.data?.id,
              time: moment().format('HH:mm:ss'),
              date: today.date,
              version: version,
              platform: Platform.OS,
            }).then(res => {
              if (res.error) {
                setAlert({
                  show: true,
                  type: 'error',
                  title: 'Error',
                  message: 'terjadi kesalahan',
                  onOK: () => {
                    setAlert({show: false});
                  },
                });
              } else if (res.data.success) {
                setAlert({
                  show: true,
                  type: 'success',
                  title: 'Absen Pulang berhasil',
                  message: false,
                  quote:
                    'Terima kasih untuk waktu dan kerja keras mu hari ini, Selamat beristirahat, jangan lupa istirahat yang cukup, Sampai jumpa besok',
                  onOK: () => {
                    setAlert({show: false});
                  },
                });
              }
            });
          },
          error => {
            setLocation(false);
            setLoading(false);
            Position = false;
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
        );
      },
      onDissmiss: () => {
        setAlert({show: false});
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      getCurrent();
      trigger();
    }, [navigation]),
  );

  useEffect(() => {
    if (today?.shift) {
      setSelectedShift(today.shift.id);
    }

    return () => {
      today;
    };
  }, [today]);

  return (
    <Layout bg={true} className="flex-1 relative">
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
                  isDisabled={today?.clock_in ? true : false}
                  fontFamily={'OpenSans-Bold'}
                  borderRadius={'lg'}
                  dropdownIcon={<></>}
                  _selectedItem={{
                    endIcon: <CheckIcon size="5" />,
                  }}
                  onValueChange={itemValue => setSelectedShift(itemValue)}>
                  {shift &&
                    shift?.data.map((data, key) => (
                      <Select.Item
                        key={key}
                        _text={{
                          color: data.name.includes('Night')
                            ? 'dark.900'
                            : 'dark.100',
                          fontWeight: '600',
                        }}
                        fontFamily={'OpenSans-Bold'}
                        bg={data.name.includes('Night') ? 'dark.100' : ''}
                        style={{color: '#fff'}}
                        startIcon={
                          data.name.includes('Day') ? (
                            <Icon name="sunny-sharp" size={20} color={'#000'} />
                          ) : (
                            <Icon name="moon-sharp" size={20} color={'#fff'} />
                          )
                        }
                        label={`${data.name} ( ${moment(
                          data.start,
                          'HH:mm:ss',
                        ).format('HH:mm')} - ${moment(
                          data.end,
                          'HH:mm:ss',
                        ).format('HH:mm')} )`}
                        // label="test"
                        value={data.id}
                      />
                    ))}
                </Select>
              </Box>
            </View>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              space={5}>
              <VStack className="flex-1 items-center">
                <Text
                  className="text-xs text-primary-950 uppercase"
                  style={{fontFamily: 'Inter-Bold'}}>
                  Masuk
                </Text>
                <Text className="text-2xl font-bold font-sans text-primary-700 text-center mb-2">
                  {today?.clock_in
                    ? moment(today?.clock_in, 'YYYY-MM-DD HH:mm:ss').format(
                        'HH:mm',
                      )
                    : '--:--'}
                </Text>
                <TouchableOpacity
                  disabled={today?.clock_in ? true : false}
                  onPress={() => checkIn()}
                  className={`w-full py-3 rounded-md flex flex-row justify-center items-center space-x-2 ${
                    today?.clock_in ? 'bg-primary-200' : ' bg-primary-500'
                  }`}>
                  <Text className="font-bold text-white font-sans uppercase">
                    <Icon name="enter" size={20} className="text-white" />
                  </Text>
                  <Text className="font-bold text-white font-sans uppercase">
                    MASUK
                  </Text>
                </TouchableOpacity>
              </VStack>
              <VStack className="flex-1 items-center">
                <Text
                  className="text-xs text-primary-950 uppercase"
                  style={{fontFamily: 'Inter-Bold'}}>
                  Pulang
                </Text>
                <Text className="text-2xl font-bold font-sans text-primary-700 text-center mb-2">
                  {today?.clock_out
                    ? moment(today?.clock_out, 'YYYY-MM-DD HH:mm:ss').format(
                        'HH:mm',
                      )
                    : '--:--'}
                </Text>
                <TouchableOpacity
                  disabled={
                    today?.clock_out == null && today?.clock_in ? false : true
                  }
                  onPress={() => checkOut()}
                  className={`w-full py-3 rounded-md flex flex-row justify-center items-center space-x-2 ${
                    today?.clock_out == null && today?.clock_in
                      ? 'bg-primary-500'
                      : ' bg-primary-200'
                  }`}>
                  <Text className="font-bold text-white font-sans uppercase">
                    <Icon name="exit" size={20} className="text-white" />
                  </Text>
                  <Text className="font-bold text-white font-sans uppercase">
                    Pulang
                  </Text>
                </TouchableOpacity>
              </VStack>
            </HStack>
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
    </Layout>
  );
};

export default Absen;
