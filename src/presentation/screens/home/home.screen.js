import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from '@components/layout.component';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Avatar,
  Button,
  Divider,
  FlatList,
  HStack,
  Image,
  Spacer,
  Stack,
  VStack,
} from 'native-base';
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
import RNFS from 'react-native-fs';
import LottieView from 'lottie-react-native';
import HomeCard from '../../components/home-card';
import {listMenu} from '../../../applications/utils/constant';
import {Menu, TimeCard} from './home-components';

const Home = ({navigation}) => {
  const {data: users} = useGetProfileQuery();
  const {data: today, refetch} = useGetTodayQuery();
  const {data} = useGetClockRecapQuery();
  const [sleepDuration, setSleepDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [download, setDownload] = useState(false);

  const iconSuccess = require('../../assets/images/success.json');

  let version = getVersion();
  let device = Platform.OS;
  const {
    data: versionApp,
    isLoading: versionLoad,
    error,
  } = useGetAppVersionQuery(device);

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

  const downloadFile = () => {
    setDownload(true);
    setProgress(0);
    const url = versionApp?.download;
    const filePath = RNFS.DownloadDirectoryPath + '/empapps.apk';

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: res => {
        const progressx = (res.bytesWritten / res.contentLength) * 100;
        setProgress(Math.floor(progressx));
      },
    })
      .promise.then(response => {
        setDownload(false);
      })
      .catch(err => {
        // console.log('Download error:', err);
      });
  };

  if (versionLoad) {
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  }

  const numColums = 4;

  return (
    <>
      {Platform.OS == 'android' && version != versionApp?.version && (
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
              {progress == 100 ? (
                <>
                  <LottieView
                    source={iconSuccess}
                    loop={false}
                    autoPlay
                    style={{height: 70, width: 70}}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setProgress(0);
                    }}>
                    <View className="py-2 px-4 border border-primary-500 rounded-md">
                      <Text className="font-extrabold text-primary-500 text-[10px]">
                        OKE
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : download ? (
                <View className="w-64 bg-primary-100 h-2 rounded-full my-4">
                  <View
                    className={`h-full bg-red-500 rounded-full`}
                    style={{width: progress + '%'}}
                  />
                </View>
              ) : (
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
              )}
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
                <TouchableOpacity className="relative">
                  <Icon name="notifications-outline" color="#fff" size={25} />
                  <View className="absolute border-[1.3px] border-white bg-primary-500 self-start rounded-full p-[4px] top-0 right-0.5" />
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
                  keyExtractor={index => index}
                />
              </HomeCard>

              <HomeCard title="Laporan & Pengajuan">
                <VStack className="w-full" space={4}>
                  <Text
                    className="text-xs text-black"
                    style={{fontFamily: 'OpenSans-Light'}}>
                    Ada <Text style={{fontFamily: 'OpenSans-Bold'}}>100 </Text>
                    Laporan dan Pengajuan yang di tujukan kepada anda untuk di
                    tindak lanjuti
                  </Text>
                  <TouchableOpacity
                    className=" bg-primary-500 py-2 px-4 rounded-md items-center"
                    onPress={() => navigate('request-report')}>
                    <Text
                      className="text-sm text-white uppercase"
                      style={{fontFamily: 'Inter-Bold'}}>
                      Semua Laporan & Pengajuan
                    </Text>
                  </TouchableOpacity>
                </VStack>
              </HomeCard>

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
