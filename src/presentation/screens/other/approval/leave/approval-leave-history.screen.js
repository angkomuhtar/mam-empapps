import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {HStack, Select, VStack} from 'native-base';
import {apiSlice} from '@slices/api.slice';
import LeaveCard from '../../../../components/leave-card.component';
import Empty from '../../../../components/empty.comnponent';
import Loading from '../../../../components/loading.component';
import {useFocusEffect} from '@react-navigation/native';
import {useLazyGetLeaveRequestHistoryQuery} from '@slices/leave.slice';

const ApprovalLeaveHistory = ({navigation}) => {
  const [trigger, result, lastPromiseInfo] =
    useLazyGetLeaveRequestHistoryQuery();
  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [navigation]),
  );

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1">
      {result.isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={result?.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <LeaveCard data={item} reviewer={true} />}
          ListEmptyComponent={<Empty />}
          ListFooterComponent={
            result?.data?.length > 0 && (
              <TouchableOpacity className="mb-10 mt-5">
                <HStack className="flex-1 justify-center">
                  <Text
                    style={{fontFamily: 'OpenSans-Bold'}}
                    className="text-primary-950/70">
                    Tampilkan lebih banyak
                  </Text>
                </HStack>
              </TouchableOpacity>
            )
          }
        />
      )}
    </VStack>
  );
};

export default ApprovalLeaveHistory;
