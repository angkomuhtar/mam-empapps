import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from '../../components/layout.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, FlatList, HStack, VStack} from 'native-base';
import RecapItem from '../../components/home/rekap-item.component';
import ClockTime from '../../components/home/clock-time.component';
import {cDuration} from '../../../applications/utils/Format';
import {useGetProfileQuery} from '@slices/user.slice';
import {useGetClockRecapQuery, useGetTodayQuery} from '@slices/clock.slice';
import moment from 'moment';
import 'moment/locale/id';
import {navigate} from '../../../applications/utils/RootNavigation';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  let width = Dimensions.get('screen').width;
  const {data: users} = useGetProfileQuery();
  const {data: today, refetch} = useGetTodayQuery();
  const {data} = useGetClockRecapQuery();
  const [sleepDuration, setSleepDuration] = useState(0);

  const bottomSheetRef = useRef();

  const datatest = [
    {
      icon: 'finger-print',
      title: 'Jam Masuk',
      data:
        today?.clock_in != null
          ? moment(today?.clock_in, 'HH:mm::ss').locale('en').format('hh:mm a')
          : '--:-- --',
    },
    {
      icon: 'hand-left',
      title: 'Jam Pulang',
      data:
        today?.clock_out != null
          ? moment(today?.clock_out, 'HH:mm::ss').locale('en').format('hh:mm a')
          : '--:-- --',
    },
    {
      icon: 'hourglass',
      title: 'Lama Bekerja',
      subtitle: 'Avg. 8 jam',
      data: cDuration(today?.clock_in, today?.clock_out),
    },
    {
      icon: 'moon',
      title: 'Lembur',
      data: '--:-- --',
      subtitle: 'min. 1 jam',
    },
  ];

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
      console.log('refetch');
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
    console.log('re calc');
  }, [today]);

  return (
    <Layout bg="bg-primary-500">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={`bg-primary-500 rounded-bl-[70px] radiu px-5 pb-20 `}>
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
              {datatest.map((item, key) => (
                <ClockTime
                  key={key}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}>
                  {item.data}
                </ClockTime>
              ))}
              <VStack
                className="justify-center bg-white rounded-lg p-5 border border-primary-100 my-2 flex-2"
                style={{width: width * 0.5 - 28}}>
                <HStack className="items-center space-x-2 flex-1 justify-between">
                  <View className="rounded-full p-1.5 bg-red-500">
                    <Icon name="bed" size={14} color="#FFF" />
                  </View>
                  <TouchableOpacity>
                    <View className="flex justify-end space-x-1 flex-row items-center border border-primary-500 rounded-full px-2 py-0.5">
                      <Text
                        className="text-xs text-primary-950"
                        style={{fontFamily: 'OpenSans-Bold'}}>
                        add
                      </Text>
                      <Icon
                        name="add-circle-sharp"
                        size={18}
                        color="rgb(239, 68, 68)"
                      />
                    </View>
                  </TouchableOpacity>
                </HStack>
                <Text
                  className="capitalize text-primary-950 text-sm mt-2"
                  style={{fontFamily: 'OpenSans-SemiBold'}}>
                  Durasi Tidur
                </Text>
                <Text
                  className="text-primary-950 text-2xl my-2"
                  style={{fontFamily: 'Inter-Bold'}}>
                  {renderData(sleepDuration)}
                </Text>
                <Text
                  className="text-primary-950 capitalize text-xs"
                  style={{fontFamily: 'OpenSans-SemiBold'}}>
                  avg. 6 jam
                </Text>
              </VStack>
            </View>
          </VStack>
        </VStack>
        <View className="h-12" />
      </ScrollView>
    </Layout>
  );
};

export default Home;
