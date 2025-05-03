import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '@components/navigation/header.component';
import {Box, HStack, Select, Skeleton, VStack} from 'native-base';
import HistoryCard from '@components/history-card-component';
import {useDispatch} from 'react-redux';
import {apiSlice} from '../../../applications/slices/api.slice';
import {useFocusEffect} from '@react-navigation/native';
import Empty from '../../components/empty.comnponent';
import Layout from '../../components/layout.component';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const Notification = ({navigation}) => {
  const [date, setDate] = useState(
    moment().format('D') > 25
      ? moment().format('Y-MM-26')
      : moment().subtract(1, 'month').format('Y-MM-26'),
  );
  const [dateD, setDateD] = useState(new Date());
  const [show, setShow] = useState(false);
  const {
    data: history,
    isLoading,
    isFetching,
    refetch,
  } = apiSlice.endpoints.getClock.useQuery(date);
  const dispatch = useDispatch();

  const Loading = () => {
    return (
      <Layout>
        <VStack space={3} p={4}>
          <Skeleton h={6} rounded="full" w="20" mb={2} />
          <HStack className="bg-white p-4 px-4 rounded-lg justify-between border border-primary-100 shadow-sm shadow-primary-100">
            <Skeleton w={'16'} h={'16'} rounded="md" />
            <VStack flex={1}>
              <Skeleton.Text px={4} />
            </VStack>
            <VStack flex={1}>
              <Skeleton.Text px={4} />
            </VStack>
          </HStack>
          <HStack className="bg-white p-4 px-4 rounded-lg justify-between border border-primary-100 shadow-sm shadow-primary-100">
            <Skeleton w={'16'} h={'16'} rounded="md" />
            <VStack flex={1}>
              <Skeleton.Text px={4} />
            </VStack>
            <VStack flex={1}>
              <Skeleton.Text px={4} />
            </VStack>
          </HStack>
          <HStack className="bg-white p-4 px-4 rounded-lg justify-between border border-primary-100 shadow-sm shadow-primary-100">
            <Skeleton w={'16'} h={'16'} rounded="md" />
            <VStack flex={1}>
              <Skeleton.Text px={4} />
            </VStack>
            <VStack flex={1}>
              <Skeleton.Text px={4} />
            </VStack>
          </HStack>
        </VStack>
      </Layout>
    );
  };
  const onRefresh = () => {
    refetch();
  };

  const onValueChange = (event, newDate) => {
    console.log(event);
    setShow(false);

    switch (event) {
      case 'dateSetAction':
        setDateD(newDate);
        setDate(moment(newDate).subtract(1, 'month').format('Y-MM-26'));
        break;
      case 'dismissedAction':
      default:
        break;
    }
  };

  console.log('history', history);

  return (
    <Layout bg={false}>
      <View className="flex-1 px-5 pt-2">
        <Header
          back={true}
          title="Notifications"
          //   rightIcon={
          //     <TouchableOpacity
          //       onPress={() => {
          //         setShow(true);
          //       }}
          //       className="border border-slate-400 py-2 px-3 rounded-md w-20 items-center">
          //       <Text
          //         className="text-xs text-primary-950"
          //         style={{fontFamily: 'Inter-Bold'}}>
          //         {moment(dateD).format('MMM YY')}
          //       </Text>
          //     </TouchableOpacity>
          //   }
        />
        {isFetching ? (
          <Loading />
        ) : (
          <VStack flex={1}>
            {!isFetching && history && (
              <FlatList
                data={history}
                ListFooterComponent={<View className="pb-28"></View>}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isFetching}
                    onRefresh={onRefresh}
                  />
                }
                ListEmptyComponent={() => (
                  <View className="">
                    <Empty />
                  </View>
                )}
                renderItem={({item}) => (
                  <View className="rounded-lg flex-1 bg-white py-3 px-5 border border-primary-100 shadow-sm">
                    <HStack space={2} className="items-center mb-2">
                      <Icon name="alert-circle" color={'#490609'} size={20} />
                      <View className="bg-blue-300/20 rounded-sm px-2 py-1">
                        <Text
                          style={{fontFamily: 'Inter-SemiBold'}}
                          className="text-[10px] text-primary-950">
                          Hazard Report
                        </Text>
                      </View>
                    </HStack>
                    <Text
                      style={{fontFamily: 'OpenSans-Bold'}}
                      className="mb-2 capitalize text-primary-950">
                      Hazard Report di update
                    </Text>
                    <Text
                      style={{fontFamily: 'Inter-Regular'}}
                      className="mb-2 text-primary-950 text-xs">
                      Laporan Hazard Report dengan nomor{' '}
                      {item.hazard_report_number} telah di tindak lanjuti
                    </Text>
                    <HStack>
                      <Text
                        style={{fontFamily: 'Inter-Bold'}}
                        className="text-[10px] text-primary-950">
                        {moment(item.date, 'YYYY-MM-DD').format(
                          'dddd, DD MMM YY',
                        )}
                      </Text>
                    </HStack>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            )}
          </VStack>
        )}

        {show && (
          <View className="absolute bottom-20 w-full left-0 z-[999]">
            <MonthPicker onChange={onValueChange} value={dateD} locale="in" />
          </View>
        )}
      </View>
    </Layout>
  );
};

export default Notification;
