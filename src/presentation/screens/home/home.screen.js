import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from '../../components/layout.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, HStack, VStack} from 'native-base';
import RecapItem from '../../components/home/rekap-item.component';
import ClockTime from '../../components/home/clock-time.component';
import {cDuration} from '../../../applications/utils/Format';
import {useGetProfileQuery} from '@slices/user.slice';
import {useGetClockRecapQuery, useGetTodayQuery} from '@slices/clock.slice';
import moment from 'moment';
import 'moment/locale/id';
import LottieView from 'lottie-react-native';
import Loading from '../../components/loading.component';

const Home = ({navigation}) => {
  let width = Dimensions.get('screen').width;
  // const data = null;
  const {data: users} = useGetProfileQuery();
  const {data: today} = useGetTodayQuery();
  const {data} = useGetClockRecapQuery();

  return (
    <Layout>
      <ScrollView showsHorizontalScrollIndicator={true}>
        <View
          className={`bg-primary-500 rounded-bl-[70px] radiu px-5 pb-20 ${
            Platform.OS == 'ios' ? 'pt-10' : 'pt-5'
          }`}>
          <HStack className="justify-between items-center py-5">
            {users?.avatar ? (
              ''
            ) : (
              <Avatar
                size="lg"
                className="bg-transparent"
                source={require('../../assets/images/avatar.png')}>
                MM
              </Avatar>
            )}
            <View className="">
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
              <TouchableOpacity>
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
            <HStack className="justify-center" space={3} mb={3}>
              <ClockTime icon="enter-outline" title="Absen Datang" subtitle="">
                {today?.clock_in != null
                  ? moment(today?.clock_in, 'HH:mm::ss')
                      .locale('en')
                      .format('hh:mm a')
                  : '--:-- --'}
              </ClockTime>
              <ClockTime icon="exit-outline" title="Absen Pulang">
                {today?.clock_out != null
                  ? moment(today?.clock_out, 'HH:mm::ss')
                      .locale('en')
                      .format('hh:mm a')
                  : '--:-- --'}
              </ClockTime>
            </HStack>
            <HStack className="justify-center" space={3}>
              <ClockTime
                icon="stopwatch-outline"
                title="Lama Bekerja"
                subtitle="Avg. 8 jam">
                {cDuration(today?.clock_in, today?.clock_out)}
              </ClockTime>
              <ClockTime
                icon="timer-outline"
                title="Lembur"
                subtitle="minimal 1 jam">
                --:-- --
              </ClockTime>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Layout>
  );
};

export default Home;
