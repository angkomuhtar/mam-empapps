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
import MonthPicker from 'react-native-month-year-picker';

const History = ({navigation}) => {
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
    );
  };
  const onRefresh = () => {
    refetch();
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     trigger();
  //   }, [navigation]),
  // );

  const onValueChange = (event, newDate) => {
    setShow(false);
    setDateD(newDate);
    setDate(moment(newDate).subtract(1, 'month').format('Y-MM-26'));
    // trigger();
  };

  return (
    <Layout>
      <View className="flex-1 px-5">
        <Header
          back={
            <Text
              className="text-xl text-primary-950"
              style={{fontFamily: 'Inter-Bold'}}>
              Riwayat
            </Text>
          }
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setShow(true);
              }}
              className="border border-slate-400 py-2 px-3 rounded-md w-20 items-center">
              <Text
                className="text-xs text-primary-950"
                style={{fontFamily: 'Inter-Bold'}}>
                {moment(dateD).format('MMM YY')}
              </Text>
            </TouchableOpacity>
          }
          className=""
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
                  <HistoryCard
                    date={item.date}
                    status={item.status}
                    checkin={item.clock_in}
                    checkout={item.clock_out}
                    late={item.late}
                    early={item.early}
                  />
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

export default History;
