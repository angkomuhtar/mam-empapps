import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Heading, HStack, Spinner, VStack} from 'native-base';
import Empty from '@components/empty.comnponent';
import Loading from '@components/loading.component';
import {
  HazardCard,
  HazardReportCard,
} from '../../../components/hazard-components';
import {navigate} from '../../../../applications/utils/RootNavigation';
import {useGetHazardReportQuery} from '../../../../applications/slices/hazard.slice';
import HazardListLoad from '../../../components/hazard-list-load.component';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const HazardReportOpen = ({navigation}) => {
  const route = useRoute();
  const {status = ''} = route.params ?? {};
  const [page, setPage] = useState(1);
  const {keyword, month} = useSelector(state => state.filter);
  const {data, isLoading, refetch, isFetching} = useGetHazardReportQuery({
    page,
    status,
    search: keyword,
    month: month,
  });
  const [item, setItem] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [navigation, keyword]);

  useEffect(() => {
    if (data && page === 1) {
      setItem(data?.data);
      setLoad(false);
    } else if (data && page > 1) {
      setItem([...item, ...data?.data]);
      setLoad(false);
    }
  }, [data]);

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
      {isLoading || (isFetching && keyword != '') ? (
        <HazardListLoad />
      ) : (
        <FlatList
          data={item}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <HazardReportCard
              data={item}
              onPress={() =>
                navigate('hazard-report-details', {
                  id: item.id,
                  type: 'reviewer',
                })
              }
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
          // onEndReachedThreshold={0.3}
          // onEndReached={() => {
          //   if (data?.total && item.length <= data?.total) {
          //     setPage(page + 1);
          //   }
          // }}
          ListFooterComponent={() => {
            if (item.length > 0) {
              return (
                <View className="min-h-10">
                  {load ? (
                    <View className="w-full">
                      <HazardListLoad />
                    </View>
                  ) : page >= data?.last_page ? (
                    <Text className="text-center py-4">
                      {' '}
                      Tidak Ada Data Lagi{' '}
                    </Text>
                  ) : (
                    <View className="">
                      <Button
                        className="my-4"
                        variant="unstyled"
                        onPress={() => {
                          setLoad(true);
                          setPage(page + 1);
                        }}>
                        Load More
                      </Button>
                    </View>
                  )}
                </View>
              );
            }
          }}
        />
      )}
    </VStack>
  );
};

export default HazardReportOpen;
