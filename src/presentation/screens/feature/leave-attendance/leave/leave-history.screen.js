import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Divider, HStack, VStack} from 'native-base';
import Empty from '@components/empty.comnponent';
import Loading from '@components/loading.component';
import {navigate} from '@utils/RootNavigation';
import {useGetCutiListQuery} from '@slices/pkwt.slice';
import moment from 'moment';

const LeaveHistory = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const {data, isLoading} = useGetCutiListQuery({page, status});
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

  const CardLeave = ({item}) => (
    <TouchableOpacity onPress={() => navigate('leave-details', {id: item.id})}>
      <View className="bg-white rounded-md p-5 border border-primary-100 drop-shadow-lg">
        <VStack>
          <HStack className="space-x-3 justify-between items-center">
            <Text
              style={{fontFamily: 'Inter-Light'}}
              className="text-sm capitalize mb-2 text-primary-950 font-bold">
              {item?.absence_type?.name}
            </Text>
            <View
              className={`items-center px-2 py-1 ${
                item?.status == 'pending'
                  ? 'bg-yellow-500'
                  : item?.status == 'approved'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } rounded-md`}>
              <Text className="text-xs font-bold text-white capitalize">
                {item?.status}
              </Text>
            </View>
          </HStack>
          <Divider className="my-1" />
          <HStack className="space-x-6">
            <VStack space={2} className="mt-2">
              <Text className="text-xs font-light text-primary-950">
                Tanggal :
              </Text>
              <Text className="text-sm font-semibold text-primary-950">
                {moment(item?.start_date).format('DD MMM YY')} -{' '}
                {moment(item?.end_date).format('DD MMM YY')}
              </Text>
            </VStack>
            <VStack space={2} className="mt-2">
              <Text className="text-xs font-light text-primary-950">
                total hari :
              </Text>
              <Text className="text-sm font-semibold text-primary-950">
                {item?.total_days} Hari
              </Text>
            </VStack>
          </HStack>
          <VStack space={2} className="mt-2">
            <Text className="text-xs font-light text-primary-950">
              Catatan :
            </Text>
            <Text className="text-sm font-semibold text-primary-950">
              {item?.notes ?? '-'}
            </Text>
          </VStack>
        </VStack>
      </View>
    </TouchableOpacity>
  );

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
                setStatus('pending');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === 'pending' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == 'pending' ? 'white' : 'black',
                  }}>
                  Pending
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStatus('approved');
                setPage(1);
              }}>
              <View
                className={`py-2 px-4 border border-primary-100 rounded-full ${
                  status === 'approved' && 'bg-primary-500'
                }`}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 11,
                    color: status == 'approved' ? 'white' : 'black',
                  }}>
                  Approved
                </Text>
              </View>
            </TouchableOpacity>
          </HStack>
          <FlatList
            data={item}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return <CardLeave item={item} />;
            }}
            ListEmptyComponent={<Empty />}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => setPage(1)}
              />
            }
            ItemSeparatorComponent={() => <View className="h-2"></View>}
            onEndReachedThreshold={0.3}
            onEndReached={() => setPage(page + 1)}
            ListFooterComponent={() => (
              <View className="min-h-10">
                {item.length > 6 && item.length >= data?.meta.total && (
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

export default LeaveHistory;
