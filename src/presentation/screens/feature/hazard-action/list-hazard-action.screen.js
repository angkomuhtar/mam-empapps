import {Text, FlatList, View, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VStack} from 'native-base';
import Empty from '@components/empty.comnponent';
import Loading from '@components/loading.component';
import {HazardActionCard} from '@components/hazard-components';
import {useGetHazardActionQuery} from '@slices/hazard.slice';
import {navigate} from '@utils/RootNavigation';

const ListHazardAction = ({navigation, route}) => {
  const {status} = route.params;
  const [page, setPage] = useState(1);
  const {data, isLoading, refetch} = useGetHazardActionQuery({page, status});
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
        <FlatList
          data={item}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <HazardActionCard
              data={item}
              onPress={() => navigate('hazard-action-details', {id: item.id})}
            />
          )}
          ListEmptyComponent={<Empty />}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                setPage(1);
                refetch();
              }}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3"></View>}
          onEndReachedThreshold={0.3}
          onEndReached={() => setPage(page + 1)}
          ListFooterComponent={() => (
            <View className="min-h-10">
              {item.length > 6 && item.length >= data?.total && (
                <Text className="text-center py-6"> Tidak Ada Data Lagi </Text>
              )}
            </View>
          )}
        />
      )}
    </VStack>
  );
};

export default ListHazardAction;
