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
import {useGetHazardHistoryQuery} from '@slices/hazard.slice';
import {navigate} from '@utils/RootNavigation';
import {InspectionCard} from '@components/inspection-card.components';
import {useGetInspectHistoryQuery} from '../../../../applications/slices/inspection.slice';

const InspectionHistory = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const {data, isLoading} = useGetInspectHistoryQuery({page, status});
  const [item, setItem] = useState([]);
  useEffect(() => {
    setPage(1);
    console.log('focus');
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
                setStatus('created');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === 'created' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == 'created' ? 'white' : 'black',
                  }}>
                  Open
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStatus('verified');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === 'verified' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == 'verified' ? 'white' : 'black',
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
              <InspectionCard
                data={item}
                onPress={() =>
                  navigate('inspection-detail', {id: item.id, type: 'creator'})
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
            // onEndReached={() => setPage(page + 1)}
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

export default InspectionHistory;
