import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {Avatar, Button, HStack, VStack} from 'native-base';
import moment from 'moment';
import {navigate} from '../../applications/utils/RootNavigation';
import Status from './status-badge.components';

const RequestCard = ({data, onAccept, onReject}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('leave-details', {data: data, reviewer: true})}>
      <View className="bg-white rounded-md border border-primary-100 mb-5 shadow-md">
        <View className="px-5 py-3 border-b border-b-primary-950/10">
          <Text
            style={{fontFamily: 'Inter-SemiBold'}}
            className="text-base capitalize">
            {data.leave_type.value}
          </Text>
        </View>
        <VStack className="px-5 py-3">
          <HStack space={3}>
            <Avatar size={'md'} />
            <VStack className="justify-center" space={1}>
              <Text
                style={{fontFamily: 'Inter-Reguler'}}
                className="text-sm capitalize text-primary-950">
                {data.employee_name}
              </Text>
              <Text
                style={{fontFamily: 'Inter-SemiBold'}}
                className="text-xs capitalize text-primary-950 ">
                {data.s_date == data.e_date
                  ? moment(data.s_date, 'YYYY-MM-DD').format('DD MMM YY')
                  : moment(data.s_date, 'YYYY-MM-DD').format('DD MMM YY') +
                    ' - ' +
                    moment(data.e_date, 'YYYY-MM-DD').format('DD MMM YY')}
              </Text>
            </VStack>
          </HStack>
          <HStack className="space-x-2 mt-4" space={4}>
            <Button
              className="flex-1 border border-primary-500 bg-transparent text-primary-500"
              onPress={onReject}>
              <Text
                style={{fontFamily: 'OpenSans-SemiBold'}}
                className="text-sm uppercase text-primary-500">
                Tolak
              </Text>
            </Button>
            <Button className="flex-1 bg-primary-500" onPress={onAccept}>
              <Text
                style={{fontFamily: 'OpenSans-Bold'}}
                className="text-sm uppercase text-white">
                Setujui
              </Text>
            </Button>
          </HStack>
        </VStack>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
