import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from '@components/layout.component';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Avatar, Divider, FlatList, HStack, Spacer, VStack} from 'native-base';
import RecapItem from '../../components/home/rekap-item.component';
import {cDuration, checkImage} from '../../../applications/utils/utils';
import {useGetProfileQuery, useGetAppVersionQuery} from '@slices/user.slice';
import {useGetClockRecapQuery, useGetTodayQuery} from '@slices/clock.slice';
import moment from 'moment';
import 'moment/locale/id';
import {navigate} from '../../../applications/utils/RootNavigation';
import {useFocusEffect} from '@react-navigation/native';
import {getVersion} from 'react-native-device-info';
import Loading from '../../components/loading.component';
import LottieView from 'lottie-react-native';
import HomeCard from '../../components/home-card';
import {listMenu} from '../../../applications/utils/constant';
import {Menu, TimeCard} from './home-components';
import messaging from '@react-native-firebase/messaging';
import {useRegisterTokenMutation} from '../../../applications/slices/notif.slice';
import {
  useGetPkwtLatestQuery,
  useGetPkwtListQuery,
} from '../../../applications/slices/pkwt.slice';
import {set} from 'zod';

const Home = ({navigation}) => {
  const {data: users} = useGetProfileQuery();
  const {data: today, refetch} = useGetTodayQuery();
  const [register_token] = useRegisterTokenMutation();
  const {data} = useGetClockRecapQuery();
  const [sleepDuration, setSleepDuration] = useState(0);
  const [showNotif, setShowNotif] = useState(true);

  const iconSuccess = require('../../assets/images/error.json');

  let version = getVersion();
  let device = Platform.OS;
  const {data: versionApp, isLoading: versionLoad} =
    useGetAppVersionQuery(device);

  const {data: pkwt, isLoading: pkwtLoad} = useGetPkwtLatestQuery({
    user_id: users?.id,
  });

  const {data: pkwtList} = useGetPkwtListQuery({
    user_id: users?.id,
  });

  const renderData = durasi => {
    if (durasi > 0) {
      let jam = Math.floor(durasi / 60),
        menit = durasi % 60;
      return (
        <HStack className="space-x-2">
          <HStack className="space-x-1">
            <Text
              className="text-xl text-primary-950 tracking-tighter"
              style={{fontFamily: 'Inter-Bold'}}>
              {jam}
            </Text>
            <Text
              className="text-xs text-primary-950 mt-3"
              style={{fontFamily: 'OpenSans-Bold'}}>
              j
            </Text>
          </HStack>
          {menit > 0 && (
            <HStack className="space-x-1">
              <Text
                className="text-xl text-primary-950 tracking-tighter"
                style={{fontFamily: 'Inter-Bold'}}>
                {menit}
              </Text>
              <Text
                className="text-xs text-primary-950 mt-3"
                style={{fontFamily: 'OpenSans-Bold'}}>
                m
              </Text>
            </HStack>
          )}
        </HStack>
      );
    } else {
      return '-- --';
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [navigation]),
  );

  useEffect(() => {
    if (today?.sleep.length > 0) {
      let dur = 0;
      today.sleep.map(data => {
        let mom = moment
          .duration(moment(data.end).diff(moment(data.start)))
          .asMinutes();
        dur += parseInt(mom);
      });
      setSleepDuration(dur);
    }
  }, [today]);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getToken();
    }
  }

  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    if (token) {
      console.log('token update');
      register_token({
        token: token,
      });
    } else {
      console.log('cannot get token');
    }
  };

  useEffect(() => {
    if (users?.fcm_token == null) {
      requestUserPermission();
    }
  }, [users]);

  const downloadFile = () => {
    Linking.openURL(versionApp?.download).catch(err =>
      console.error('err loink', err),
    );
  };

  if (versionLoad) {
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  }

  const numColums = 4;
  const withContract = pkwtList?.total > 0;
  const activeContract = pkwt == null ? false : true;
  const contractleft =
    moment(pkwt?.end_date, 'DD-MM-YYYY').diff(moment(), 'days') ?? null;

  return (
    <>
      {version < versionApp?.version && (
        <Modal transparent={true}>
          <View className="flex-1 h-full justify-center items-center">
            <View className="bg-white rounded-md py-4 px-6 border border-primary-500 items-center">
              <Text
                className="text-xl text-primary-950"
                style={{fontFamily: 'OpenSans-Bold'}}>
                Versi Outdated
              </Text>
              <Text
                style={{fontFamily: 'OpenSans-Medium'}}
                className="text-sm my-4">
                Versi Aplikasi Anda harus di perbaharui
              </Text>
              <LottieView
                source={iconSuccess}
                loop={false}
                autoPlay
                style={{height: 70, width: 70}}
              />
              <TouchableOpacity
                onPress={() => {
                  downloadFile();
                }}>
                <View className="bg-primary-500 px-4 py-2 rounded-md mt-4">
                  <Text
                    className="text-white"
                    style={{fontFamily: 'Inter-Bold'}}>
                    Unduh Sekarang
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Layout>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-[#fafafa]">
            <View className="px-5 pb-8 pt-12 bg-primary-600 rounded-br-[60px] gap-5">
              <View className="flex flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  {users?.avatar && checkImage(users.avatar_url) ? (
                    <Avatar
                      size="sm"
                      className="bg-white text-black"
                      source={{uri: users.avatar_url}}>
                      EU
                    </Avatar>
                  ) : (
                    <Avatar
                      size="sm"
                      className="bg-transparent"
                      source={require('../../assets/images/avatar.png')}>
                      MM
                    </Avatar>
                  )}
                  <View>
                    <Text
                      className="text-sm text-white"
                      style={{fontFamily: 'OpenSans-Bold'}}>
                      {users?.profile?.name}
                    </Text>
                    <Text
                      className="text-[10px] text-white"
                      style={{fontFamily: 'OpenSans-Medium'}}>
                      {`${users?.employee?.division?.division} - ${users?.employee?.position?.position}`}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="relative"
                  onPress={() => navigate('notif-list')}>
                  <Icon name="notifications" color="#fff" size={30} />
                  <View className="absolute border-[1px] border-white bg-primary-500 self-start rounded-full p-[2px] top-0 -right-0.5 aspect-square">
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        fontSize: 8,
                        color: '#fff',
                      }}>
                      99
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className="bg-white/30 rounded-xl px-3 py-3 space-y-2">
                <TouchableOpacity
                  className="flex-row justify-between items-center"
                  onPress={() => navigate('history')}>
                  <View>
                    <Text
                      className="text-xs text-white"
                      style={{fontFamily: 'OpenSans-Regular'}}>
                      Presensi
                    </Text>
                    <Text
                      className="text-sm text-white"
                      style={{fontFamily: 'Inter-Bold'}}>
                      {`${moment(data?.rekap?.start, 'YYYY-MM-DD').format(
                        'DD MMMM',
                      )} - ${moment(data?.rekap?.end, 'YYYY-MM-DD').format(
                        'DD MMMM',
                      )}`}
                    </Text>
                  </View>
                  <Entypo name="chevron-right" size={20} color="#fff" />
                </TouchableOpacity>
                <Divider />
                <View className="flex-row items-center">
                  <RecapItem type="Hadir" value={data?.rekap?.hadir} />
                  <RecapItem type="Alpha" value={data?.rekap?.alpa} />
                  <RecapItem type="Izin/Sakit" value={data?.rekap?.izin} />
                </View>
              </View>
            </View>
          </View>
          <View className="bg-primary-600">
            <View className="bg-[#fafafa] rounded-tl-[60px] min-h-[100px] py-7 px-5 pb-40">
              {withContract && !activeContract && (
                <View className="bg-primary-500/80 rounded-lg border border-gray-200 mb-2">
                  <View className="w-full flex flex-row pt-2 pb-1 px-4 items-center">
                    <Icon name="notifications-circle" size={22} color="#000" />
                    <Text
                      className="text-lg ml-1 flex-1 text-black"
                      style={{fontFamily: 'OpenSans-Bold'}}>
                      Informasi
                    </Text>
                  </View>
                  <View className="px-4 pb-3">
                    <Text
                      className="text-xs text-black"
                      style={{fontFamily: 'OpenSans-Medium'}}>
                      Kontrak Kerja Anda Belum Aktif Silahkan Hubungi HRD.
                    </Text>
                  </View>
                </View>
              )}

              {activeContract && contractleft <= 7 && (
                <View
                  className={`bg-primary-500/80 rounded-lg border border-gray-200 mb-2 relative ${
                    showNotif ? '' : 'hidden'
                  }`}>
                  <View className="absolute top-2 right-2 rounded-full z-10">
                    <TouchableOpacity
                      onPress={() => {
                        setShowNotif(false);
                      }}>
                      <Icon name="close-circle" size={18} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <View className="w-full flex flex-row pt-2 pb-1 px-4 items-center">
                    <Icon name="notifications-circle" size={22} color="#000" />
                    <Text
                      className="text-lg ml-1 flex-1 text-black"
                      style={{fontFamily: 'OpenSans-Bold'}}>
                      Informasi
                    </Text>
                  </View>
                  <View className="px-3 pb-3">
                    <Text
                      className="text-xs text-black"
                      style={{fontFamily: 'OpenSans-Medium'}}>
                      Kontrak Kerja Anda akan
                      <Text
                        className="font-bold"
                        style={{fontFamily: 'OpenSans-Bold'}}>
                        {' berakhir dalam ' + contractleft + ' hari, '}
                      </Text>
                      pada tgl{' '}
                      <Text
                        className="font-bold"
                        style={{fontFamily: 'OpenSans-Bold'}}>
                        {moment(pkwt?.end_date, 'DD/MM/YYYY').format(
                          ' DD MMMM YYYY ',
                        )}
                      </Text>
                      Silahkan periksa dan perbarui kontrak kerja Anda tepat
                      waktu untuk menghindari gangguan pada akses sistem.
                    </Text>
                  </View>
                </View>
              )}
              <HomeCard title="Semua Fitur">
                <FlatList
                  data={listMenu}
                  renderItem={({item, index}) => {
                    return (
                      <Menu
                        index={index}
                        label={item.label}
                        num={numColums}
                        onpress={() => item.onpress()}
                        source={item.source}
                      />
                    );
                  }}
                  numColumns={numColums}
                  key={numColums}
                />
              </HomeCard>

              {(users?.user_roles == 'superadmin' ||
                users?.employee?.position?.position_class?.class >= 4) && (
                <HomeCard title="Laporan & Pengajuan">
                  <VStack className="w-full" space={4}>
                    <Text
                      className="text-xs text-black"
                      style={{fontFamily: 'OpenSans-Light'}}>
                      Laporan dan Pengajuan yang di tujukan kepada anda untuk di
                      tindak lanjuti
                    </Text>
                    <TouchableOpacity
                      className=" bg-primary-500 py-2 px-4 rounded-md items-center"
                      onPress={() => navigate('request')}>
                      <Text
                        className="text-sm text-white uppercase"
                        style={{fontFamily: 'Inter-Bold'}}>
                        Semua Laporan & Pengajuan
                      </Text>
                    </TouchableOpacity>
                  </VStack>
                </HomeCard>
              )}

              <HomeCard title="Presensi Hari Ini">
                <HStack className="w-full" flexWrap="wrap">
                  <TimeCard
                    icon="finger-print"
                    label="jam masuk"
                    value={
                      today?.clock_in != null
                        ? moment(today?.clock_in, 'YYYY-MM-DD HH:mm::ss')
                            .locale('en')
                            .format('HH:mm')
                        : '--:--'
                    }
                  />
                  <Spacer />
                  <TimeCard
                    icon="hand-left"
                    label="jam pulang"
                    value={
                      today?.clock_out != null
                        ? moment(today?.clock_out, 'YYYY-MM-DD HH:mm::ss')
                            .locale('en')
                            .format('HH:mm')
                        : '--:--'
                    }
                  />
                  <TimeCard
                    icon="hourglass"
                    label="Lama Kerja"
                    value={cDuration(today?.clock_in, today?.clock_out)}
                  />
                  <Spacer />
                  <TimeCard
                    icon="bed"
                    label="Durasi Tidur"
                    value={renderData(
                      today?.sleep?.length > 0 ? sleepDuration : 0,
                    )}
                  />
                </HStack>
              </HomeCard>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default Home;
