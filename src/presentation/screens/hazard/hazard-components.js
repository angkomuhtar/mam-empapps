import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider, HStack, VStack} from 'native-base';

export const HazardCard = () => {
  return (
    <TouchableOpacity className="py-2 px-4 border border-primary-100 rounded-lg">
      <HStack className="py-1.5 items-center justify-between">
        <Text className="text-xs" style={{fontFamily: 'OpenSans-ExtraBold'}}>
          Disposal Sekitarnya
        </Text>
        <Text
          className="text-[9px] capitalize text-primary-950"
          style={{fontFamily: 'Inter-Bold'}}>
          2 Hari
        </Text>
      </HStack>
      <Divider />
      <HStack className="justify-between py-2 space-x-3">
        <VStack className="flex-1 items-start">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Status
          </Text>
          <Text
            className="text-xs py-1 px-3 bg-green-500 rounded-md text-white"
            style={{fontFamily: 'Inter-ExtraBold'}}>
            Open
          </Text>
        </VStack>
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            kategori
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-ExtraBold'}}>
            Kondisi Tidak Aman
          </Text>
        </VStack>
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Tanggal
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-Bold'}}>
            Jumat, 02 Feb 2024
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export const ErrorMessage = ({value}) => (
  <Text
    className="text-primary-500 capitalize ml-1 mt-1 text-[10px]"
    style={{fontFamily: 'Inter-Medium'}}>
    {value}
  </Text>
);
