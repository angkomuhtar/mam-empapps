import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {HStack, VStack} from 'native-base';

const ClockTime = ({children, title, icon = 'enter-outline', subtitle}) => {
  return (
    <VStack className="justify-center bg-white rounded-lg p-5 flex-1 border border-primary-100">
      <HStack className="items-center space-x-2">
        <View className="rounded-md p-[4px] bg-red-500">
          <Icon name={icon} size={18} color="#FFF" />
        </View>
        <Text
          className="capitalize text-primary-950 text-md"
          style={{fontFamily: 'Inter-regular'}}>
          {title}
        </Text>
      </HStack>
      <Text
        className="text-primary-950 text-[24px] pt-2 pb-1"
        style={{fontFamily: 'Montserrat-Bold'}}>
        {children}
      </Text>
      <Text
        className="text-primary-950 capitalize text-xs"
        style={{fontFamily: 'Inter-Light'}}>
        {subtitle}
      </Text>
    </VStack>
  );
};

export default ClockTime;
