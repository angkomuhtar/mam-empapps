import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';
import Empty from '../../components/empty.comnponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '../../../applications/utils/RootNavigation';

const NewsListScreen = () => {
  const data = [];

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
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
        ItemSeparatorComponent={() => <View className="h-3"></View>}
        ListFooterComponent={() => <View className="h-2 0"></View>}
      />
    </VStack>
  );
};

export default NewsListScreen;
