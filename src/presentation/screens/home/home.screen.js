import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from '../../components/layout.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Avatar,
  Box,
  Button,
  FlatList,
  HStack,
  Progress,
  VStack,
} from 'native-base';
import RecapItem from '../../components/home/rekap-item.component';
import ClockTime from '../../components/home/clock-time.component';
import {cDuration} from '../../../applications/utils/Format';
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

const Home = ({navigation}) => {
  let width = Dimensions.get('screen').width;
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
              className="text-2xl text-primary-950 tracking-tighter"
              style={{fontFamily: 'Inter-Bold'}}>
              {jam}
            </Text>
            <Text
              className="text-xs text-primary-950 mt-3"
              style={{fontFamily: 'OpenSans-Bold'}}>
              jm
            </Text>
          </HStack>
          {menit > 0 && (
            <HStack className="space-x-1">
              <Text
                className="text-2xl text-primary-950 tracking-tighter"
                style={{fontFamily: 'Inter-Bold'}}>
                {menit}
              </Text>
              <Text
                className="text-xs text-primary-950 mt-3"
                style={{fontFamily: 'OpenSans-Bold'}}>
                mnt
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
    console.log('URL DOWNl', versionApp);

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
        console.log('Download error:', err);
      });
  };

  if (versionLoad) {
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  }

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
      <Layout bg="bg-primary-500">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            className={`bg-primary-500 rounded-bl-[70px] radiu px-5 pb-20 `}>
            <HStack space={5} className="justify-between items-center py-5">
              {users?.avatar ? (
                <Avatar
                  size="2xl"
                  className="bg-transparent"
                  source={{uri: users.avatar_url}}>
                  EU
                </Avatar>
              ) : (
                <Avatar
                  size="lg"
                  className="bg-transparent"
                  source={require('../../assets/images/avatar.png')}>
                  MM
                </Avatar>
              )}
              <View className="flex-1">
                <Text
                  className="text-xl text-primary-50 capitalize"
                  style={{fontFamily: 'Inter-Bold'}}>
                  {users?.profile?.name}
                </Text>
                <Text
                  className="text-sm text-primary-50"
                  style={{fontFamily: 'Inter-Light'}}>
                  {`${users?.employee?.division?.division} - ${users?.employee?.position?.position}`}
                </Text>
              </View>
              <TouchableOpacity className="relative border border-white rounded-full p-1">
                <Icon name="notifications" color="#fff" size={20} />
                <View className="absolute border border-white bg-primary-500 self-start rounded-full p-[5px] -top-[2px] -right-[3px]" />
              </TouchableOpacity>
            </HStack>
          </View>
          <VStack className="mx-5 space-y-5" top={-70}>
            <View className="bg-white p-3 rounded-lg border border-primary-100">
              <View className="flex-row justify-between mb-3">
                <Text
                  className=" text-primary-950 text-base"
                  style={{fontFamily: 'Inter-Bold'}}>
                  Rekap Presensi
                </Text>
                <TouchableOpacity onPress={() => navigate('history')}>
                  <Text
                    className="text-blue-800 underline"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    Details
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between">
                <RecapItem type="Hadir" value={data?.rekap?.hadir} />
                <RecapItem type="Alpha" value={data?.rekap?.alpa} />
                <RecapItem type="Izin/Sakit" value={data?.rekap?.izin} />
              </View>
            </View>
            <VStack className="">
              <Text
                className="pb-3 text-primary-950 text-base"
                style={{fontFamily: 'Inter-Bold'}}>
                Presensi Hari Ini
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <ClockTime icon="finger-print" title="Jam Masuk">
                  {today?.clock_in != null
                    ? moment(today?.clock_in, 'HH:mm::ss')
                        .locale('en')
                        .format('hh:mm a')
                    : '--:-- --'}
                </ClockTime>
                <ClockTime icon="hand-left" title="Jam Pulang">
                  {today?.clock_out != null
                    ? moment(today?.clock_out, 'HH:mm::ss')
                        .locale('en')
                        .format('hh:mm a')
                    : '--:-- --'}
                </ClockTime>
                <ClockTime
                  icon="hourglass"
                  title="Lama Bekerja"
                  subtitle="Avg. 8 jam">
                  {cDuration(today?.clock_in, today?.clock_out)}
                </ClockTime>
                <ClockTime icon="moon" title="Lembur" subtitle="min. 1 jam">
                  {'--:-- --'}
                </ClockTime>
                <ClockTime
                  icon="bed"
                  title="Durasi Tidur"
                  subtitle="avg. 6 jam"
                  button={today?.sleep.length == 0 ? true : false}
                  onpress={() => navigate('add-sleep')}>
                  {renderData(sleepDuration)}
                </ClockTime>
              </View>
            </VStack>
          </VStack>
          <View className="h-12" />
        </ScrollView>
      </Layout>
    </>
  );
};

export default Home;
