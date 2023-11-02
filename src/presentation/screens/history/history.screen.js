import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useCallback} from 'react';
import Header from '@components/navigation/header.component';
import {HStack, Skeleton, VStack} from 'native-base';
import HistoryCard from '@components/history-card-component';
import {useDispatch} from 'react-redux';
import {apiSlice} from '../../../applications/slices/api.slice';
import {useFocusEffect} from '@react-navigation/native';
import Empty from '../../components/empty.comnponent';
import Layout from '../../components/layout.component';

const History = ({navigation}) => {
  const [trigger, {data: history, isLoading}, lastPromiseInfo] =
    apiSlice.endpoints.getClock.useLazyQuery();
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

  // console.log('im here >>>', result);

  const onRefresh = () => {
    trigger();
  };

  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [navigation]),
  );

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
          className=""
        />
        {isLoading ? (
          <Loading />
        ) : (
          <VStack flex={1}>
            {!isLoading && history && (
              <FlatList
                data={history}
                ListFooterComponent={<View className="pb-28"></View>}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
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
                  />
                )}
                keyExtractor={item => item.id}
              />
            )}
          </VStack>
        )}
      </View>
    </Layout>
  );
};

export default History;
