import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
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

const SopListScreen = () => {
  const {data, error, refetch, isLoading, isFetching} = useGetSOPFolderQuery();

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
      {isLoading || isFetching ? (
        <VStack space={3}>
          <SopListLoading />
          <SopListLoading />
          <SopListLoading />
        </VStack>
      ) : (
        <FlatList
          data={data}
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
              onRefresh={() => {
                refetch();
              }}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3"></View>}
          ListFooterComponent={() => <View className="h-20"></View>}
        />
      )}
    </VStack>
  );
};

export default SopListScreen;
