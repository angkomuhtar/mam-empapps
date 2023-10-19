import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useCallback} from 'react';
import Header from '@components/navigation/header.component';
import {HStack, Skeleton, VStack} from 'native-base';
import HistoryCard from '@components/history-card-component';
import {useDispatch} from 'react-redux';
import {apiSlice} from '../../../applications/slices/api.slice';
import {useFocusEffect} from '@react-navigation/native';

const History = ({navigation}) => {
  // const {data: history, isLoading} = useGetClockQuery();
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
    // dispatch(apiSlice.endpoints.getClockQuery);
    trigger();
  };

  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [navigation]),
  );

  return (
    <View className="flex-1 p-5">
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
      {isLoading && <Loading />}
      <VStack flex={1}>
        {!isLoading && history && (
          <FlatList
            data={history}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => {
              return (
                <Text className="font-sans text-center font-semibold">
                  No Data
                </Text>
              );
            }}
            renderItem={({item}) => (
              <HistoryCard
                date={item.date}
                status={item.status}
                checkin={item.clock_in}
                checkout={item.clock_out}
              />
            )}
            ListFooterComponent={() => <VStack h={10} />}
            keyExtractor={item => item.id}
          />
        )}
      </VStack>
    </View>
  );
};

export default History;
