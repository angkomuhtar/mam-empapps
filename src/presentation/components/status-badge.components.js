import {View, Text} from 'react-native';
import React from 'react';

const Status = ({data}) => {
  switch (data) {
    case '0':
      return (
        <View className="bg-yellow-500 self-start py-1 px-2 rounded-md">
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-white uppercase text-[11px]">
            menunggu konfirmasi
          </Text>
        </View>
      );
      break;
    case '1':
      return (
        <View className="bg-yellow-500 self-start py-1 px-2 rounded-md">
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-white uppercase text-[11px]">
            HR REVIEW
          </Text>
        </View>
      );
      break;
    case '2':
      return (
        <View className="bg-green-500 self-start py-1 px-2 rounded-md">
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-white uppercase text-[11px]">
            disetujui
          </Text>
        </View>
      );
      break;
    case '3':
      return (
        <View className="bg-red-500 self-start py-1 px-2 rounded-md">
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-white uppercase text-[11px]">
            ditolak atasan
          </Text>
        </View>
      );
      break;
    case '4':
      return (
        <View className="bg-red-500 self-start py-1 px-2 rounded-md">
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-white uppercase text-[11px]">
            ditolak HRD
          </Text>
        </View>
      );
      break;
    case '5':
      return (
        <View className="bg-red-500 self-start py-1 px-2 rounded-md">
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-white uppercase text-[11px]">
            dibatalkan
          </Text>
        </View>
      );
      break;
    default:
      return (
        <View className="bg-green-100 self-start py-1 px-2 rounded-md">
          <Text style={{fontFamily: 'Inter-Medium'}} className="text-green-500">
            'NUll'
          </Text>
        </View>
      );
      break;
  }
};

export default Status;
