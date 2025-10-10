import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HStack, Skeleton, VStack} from 'native-base';
import {useGetSOPFolderQuery} from '../../../applications/slices/sop.slice';
import Empty from '../../components/empty.comnponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate, push} from '../../../applications/utils/RootNavigation';

export const SopListLoading = () => (
  <HStack className="items-center  space-x-2 border border-primary-100 rounded-md px-3 py-3">
    <Skeleton h={10} w={'20%'} />
    <VStack className="flex-1 space-y-2">
      <Skeleton rounded={10} h={3} />
      <Skeleton rounded={10} h={3} w="40%" />
    </VStack>
  </HStack>
);

const SopListScreen = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [listItem, setListItem] = useState([]);
  useEffect(() => {
    setPage(1);
  }, [navigation]);

  const {data, isLoading, isFetching} = useGetSOPFolderQuery({page});
  useEffect(() => {
    if (data && page === 1) {
      setListItem(data?.data);
    } else if (data && page > 1) {
      setListItem([...listItem, ...data?.data]);
    }
  }, [data]);

  console.log(data?.meta, 'page', page);

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
      {isLoading ? (
        <VStack space={3}>
          <SopListLoading />
          <SopListLoading />
          <SopListLoading />
        </VStack>
      ) : (
        <FlatList
          data={listItem}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigate('detail-folder-sop', {
                  id: item.id,
                  name: item.title,
                })
              }>
              <HStack className="items-center space-x-2 border border-primary-100 rounded-md px-3 py-3">
                <Icon name="folder-outline" size={35} />
                <View className="flex-1">
                  <Text
                    className="text-sm text-primary-950"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    {item.title}
                  </Text>
                  <Text
                    className="text-xs text-primary-950"
                    style={{fontFamily: 'Inter-Regular'}}>
                    {item.total_files} files
                  </Text>
                </View>
              </HStack>
            </TouchableOpacity>
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
          onEndReached={() => {
            if (data?.meta.total > listItem.length) setPage(page + 1);
          }}
          ListFooterComponent={() => (
            <View className="">
              {data?.meta.total > listItem.length && (
                <VStack mt={3}>
                  <SopListLoading />
                </VStack>
              )}
              <View className="h-20"></View>
            </View>
          )}
        />
      )}
    </VStack>
  );
};

export default SopListScreen;
