import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Avatar, HStack} from 'native-base';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '../../applications/utils/RootNavigation';

const LeaveConfirmCard = () => {
  return (
    <TouchableOpacity
      onPress={() => navigate('leave-details', {reviewer: true})}>
      <View className="bg-white rounded-md p-5">
        <HStack className="pb-4 justify-between items-center">
          <Text
            style={{fontFamily: 'Inter-SemiBold'}}
            className="text-lg text-primary-950">
            Cuti Tahunan
          </Text>
          <View className="bg-blue-500 self-start py-1 px-2 rounded-md">
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-white capitalize">
              created
            </Text>
          </View>
        </HStack>
        <HStack className="space-x-3">
          <Avatar size="md">MM</Avatar>
          <View className="justify-center">
            <Text
              style={{fontFamily: 'Inter-Light'}}
              className="text-xs capitalize mb-2">
              Leslie Alexander
            </Text>
            <Text
              style={{fontFamily: 'Inter-SemiBold'}}
              className="text-sm capitalize ">
              {moment().format('MMM DD, YYYY')} -{' '}
              {moment().add('5', 'd').format('MMM DD, YYYY')}
            </Text>
          </View>
        </HStack>
        <HStack className="space-x-2 mt-4">
          <TouchableOpacity className="flex-1 bg-primary-100 py-2 rounded-md items-center flex-row justify-center space-x-1">
            <Icon name="close-circle-outline" size={20} color="#000" />
            <Text
              style={{fontFamily: 'Inter-SemiBold'}}
              className="text-primary-950 text-sm">
              Tolak
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-primary-500 py-2 rounded-md items-center flex-row justify-center space-x-1">
            <Icon name="checkmark-done-circle-outline" size={20} color="#fff" />
            <Text
              style={{fontFamily: 'Inter-SemiBold'}}
              className="text-white text-sm">
              Setujui
            </Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </TouchableOpacity>
  );
};

export default LeaveConfirmCard;
