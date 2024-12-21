import {Text, TouchableOpacity, FlatList, View} from 'react-native';
import React, {useCallback} from 'react';
import {Divider, Fab, HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import Empty from '@components/empty.comnponent';
import Loading from '@components/loading.component';
import {useFocusEffect} from '@react-navigation/native';
import {HazardCard} from './hazard-components';
import {useLazyGetLeavesQuery, useGetLeavesQuery} from '@slices/leave.slice';
import {apiSlice} from '@slices/api.slice';
import {navigate, push} from '@utils/RootNavigation';

const HazardHistory = ({navigation}) => {
  const [trigger, {data, isFetching}, lastPromiseInfo] =
    useLazyGetLeavesQuery();
  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [navigation]),
  );

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1">
      {isFetching ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <HazardCard />}
          ListEmptyComponent={<Empty />}
          ItemSeparatorComponent={() => <View className="h-3"></View>}
          ListFooterComponent={
            <TouchableOpacity className="mb-10 mt-5">
              <HStack className="flex-1 justify-center">
                <Text
                  style={{fontFamily: 'OpenSans-Bold'}}
                  className="text-primary-950/70">
                  Tampilkan lebih banyak
                </Text>
              </HStack>
            </TouchableOpacity>
          }
        />
      )}
      <Fab
        renderInPortal={false}
        onPress={() => push('hazard-add')}
        shadow={2}
        size="sm"
        icon={<Icon name="duplicate" size={20} color={'#fff'} />}
      />
    </VStack>
  );
};

export default HazardHistory;
