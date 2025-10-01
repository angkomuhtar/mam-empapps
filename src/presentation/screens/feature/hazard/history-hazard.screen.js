import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Fab, HStack, VStack} from 'native-base';
import Empty from '@components/empty.comnponent';
import Loading from '@components/loading.component';
import {HazardCard} from '@components/hazard-components';
import {useGetHazardHistoryQuery} from '@slices/hazard.slice';
import {navigate} from '@utils/RootNavigation';

const HistoryHazard = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const {data, isLoading} = useGetHazardHistoryQuery({page, status});
  const [item, setItem] = useState([]);
  useEffect(() => {
    setPage(1);
  }, [navigation]);

  useEffect(() => {
    if (data && page === 1) {
      setItem(data?.data);
    } else if (data && page > 1) {
      setItem([...item, ...data?.data]);
    }
  }, [data]);

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HStack className="pb-2 border-b border-primary-100 mb-3" space={3}>
            <TouchableOpacity
              onPress={() => {
                setStatus('');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === '' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == '' ? 'white' : 'black',
                  }}>
                  Semua
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setStatus('open');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === 'open' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == 'open' ? 'white' : 'black',
                  }}>
                  Open
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStatus('onprogress');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === 'onprogress' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == 'onprogress' ? 'white' : 'black',
                  }}>
                  On Progress
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStatus('closed');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === 'closed' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == 'closed' ? 'white' : 'black',
                  }}>
                  Done
                </Text>
              </View>
            </TouchableOpacity>
          </HStack>
          <FlatList
            data={item}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <HazardCard
                data={item}
                onPress={() =>
                  navigate('hazard-details', {id: item.id, type: 'reviewer'})
                }
              />
            )}
            ListEmptyComponent={<Empty />}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => setPage(1)}
              />
            }
            ItemSeparatorComponent={() => <View className="h-3"></View>}
            onEndReachedThreshold={0.3}
            onEndReached={() => setPage(page + 1)}
            ListFooterComponent={() => (
              <View className="min-h-10">
                {item.length > 6 && item.length >= data?.total && (
                  <Text className="text-center py-6">
                    {' '}
                    Tidak Ada Data Lagi{' '}
                  </Text>
                )}
              </View>
            )}
          />
        </>
      )}
    </VStack>
  );
};

export default HistoryHazard;
