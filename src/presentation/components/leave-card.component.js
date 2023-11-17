import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';
import moment from 'moment';
import {navigate} from '../../applications/utils/RootNavigation';
import Status from './status-badge.components';

const LeaveCard = ({data, reviewer = false}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('leave-details', {data: data, reviewer: reviewer})
      }>
      <View className="bg-white rounded-md p-5 border border-primary-100 mb-5 drop-shadow-lg">
        <VStack>
          <HStack className="space-x-3 justify-between">
            <Text
              style={{fontFamily: 'Inter-Light'}}
              className="text-xs capitalize mb-2 text-primary-950">
              Tanggal
            </Text>
            <Status data={data.status} />
          </HStack>
          <Text
            style={{fontFamily: 'Inter-SemiBold'}}
            className="text-sm capitalize text-primary-950 ">
            {data.s_date == data.e_date
              ? moment(data.s_date, 'YYYY-MM-DD').format('DD MMM YY')
              : moment(data.s_date, 'YYYY-MM-DD').format('DD MMM YY') +
                ' - ' +
                moment(data.e_date, 'YYYY-MM-DD').format('DD MMM YY')}
          </Text>
        </VStack>
        <HStack className="space-x-2 mt-4">
          <View className="flex-1">
            <Text
              className="text-xs mb-2 text-primary-950"
              style={{fontFamily: 'Inter-Light'}}>
              jumlah hari
            </Text>
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-md text-primary-950">
              {data.tot_day} Hari
            </Text>
          </View>
          <View className="flex-1">
            <Text
              className="text-xs mb-2 text-primary-950"
              style={{fontFamily: 'Inter-Light'}}>
              jenis Izin
            </Text>
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-md text-primary-950 capitalize">
              {data.leave_type.value}
            </Text>
          </View>
          <View className="flex-1">
            <Text
              className="text-xs mb-2 text-primary-950"
              style={{fontFamily: 'Inter-Light'}}>
              atasan
            </Text>
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-md text-primary-950">
              {data?.approver?.profile?.name}
            </Text>
          </View>
        </HStack>
      </View>
    </TouchableOpacity>
  );
};

export default LeaveCard;
