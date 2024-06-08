import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {HStack, VStack} from 'native-base';

const ClockTime = ({
  children,
  title,
  icon = 'enter-outline',
  subtitle,
  button = false,
  onpress,
}) => {
  const width = Dimensions.get('screen').width;
  return (
    <VStack
      className="justify-center bg-white rounded-lg p-5 border border-primary-100 my-2 flex-2"
      style={{width: width * 0.5 - 28}}>
      <HStack className="items-center space-x-2 justify-between">
        <View className="rounded-full p-1.5 bg-red-500">
          <Icon name={icon} size={14} color="#FFF" />
        </View>
        {button && (
          <TouchableOpacity onPress={onpress}>
            <View className="flex justify-end space-x-1 flex-row items-center border border-primary-500 rounded-full px-3 py-0.5">
              <Text
                className="text-xs text-primary-950"
                style={{fontFamily: 'OpenSans-Bold'}}>
                add
              </Text>
              <Icon
                name="add-circle-sharp"
                size={18}
                color="rgb(239, 68, 68)"
              />
            </View>
          </TouchableOpacity>
        )}
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
