import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';
import moment from 'moment';

const Past = () => {
  return (
    <View className="p-5">
      <View className="bg-white rounded-md p-5">
        <HStack className="space-x-3 justify-between">
          <View className="justify-center flex-1">
            <Text
              style={{fontFamily: 'Inter-Light'}}
              className="text-xs capitalize mb-2">
              Tanggal
            </Text>
            <Text
              style={{fontFamily: 'Inter-SemiBold'}}
              className="text-sm capitalize ">
              {moment().format('MMM DD, YYYY')} -{' '}
              {moment().add('5', 'd').format('MMM DD, YYYY')}
            </Text>
          </View>
          <View className="bg-green-100 self-start py-1 px-2 rounded-md">
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-green-500">
              disetujui
            </Text>
          </View>
        </HStack>
        <HStack className="space-x-2 mt-4">
          <View className="flex-1">
            <Text className="text-xs mb-2" style={{fontFamily: 'Inter-Light'}}>
              jumlah hari
            </Text>
            <Text style={{fontFamily: 'Inter-Medium'}} className="text-md">
              3 Hari
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs mb-2" style={{fontFamily: 'Inter-Light'}}>
              jenis Izin
            </Text>
            <Text style={{fontFamily: 'Inter-Medium'}} className="text-md">
              Izin Sakit
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs mb-2" style={{fontFamily: 'Inter-Light'}}>
              atasan
            </Text>
            <Text style={{fontFamily: 'Inter-Medium'}} className="text-md">
              Martin
            </Text>
          </View>
        </HStack>
      </View>
    </View>
  );
};

export default Past;
