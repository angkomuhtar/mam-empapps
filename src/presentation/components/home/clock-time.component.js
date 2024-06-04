import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {HStack, VStack} from 'native-base';

const ClockTime = ({children, title, icon = 'enter-outline', subtitle}) => {
  const width = Dimensions.get('screen').width;
  return (
    <VStack
      className="justify-center bg-white rounded-lg p-5 border border-primary-100 my-2 flex-2"
      style={{width: width * 0.5 - 28}}>
      <HStack className="items-center space-x-2">
        <View className="rounded-full p-1.5 bg-red-500">
          <Icon name={icon} size={14} color="#FFF" />
        </View>
      </HStack>
      <Text
        className="capitalize text-primary-950 text-sm mt-2"
        style={{fontFamily: 'OpenSans-SemiBold'}}>
        {title}
      </Text>
      <Text
        className="text-primary-950 text-2xl my-2"
        style={{fontFamily: 'Inter-Bold'}}>
        {children}
      </Text>
      <Text
        className="text-primary-950 capitalize text-xs"
        style={{fontFamily: 'OpenSans-SemiBold'}}>
        {subtitle}
      </Text>
    </VStack>
  );
};

export default ClockTime;
