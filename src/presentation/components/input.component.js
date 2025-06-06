import {View, Text, TextInput, Platform} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';

const Input = props => {
  const elprops = Object.fromEntries(
    Object.entries(props).filter(([key, value]) => {
      if (
        key !== 'rightIcon' ||
        key !== 'title' ||
        key !== 'inputStyle' ||
        key !== 'error'
      ) {
        return key => value;
      }
    }),
  );

  return (
    <View className="flex-1">
      <HStack className="border border-primary-100 py-2 px-4 rounded-md bg-white">
        <VStack className="flex-1">
          <Text
            className="text-xs text-primary-950 capitalize"
            style={{fontFamily: 'OpenSans-Regular'}}>
            {props.title}
          </Text>
          <TextInput
            {...elprops}
            className={`${
              Platform.OS == 'ios' ? 'py-2' : 'py-0'
            } text-primary-950 text-sm h-10`}
            style={[{fontFamily: 'OpenSans-Light'}, props.inputStyle]}
          />
        </VStack>
        <View className="justify-center items-center">{props?.rightIcon}</View>
      </HStack>
      {props?.error && (
        <Text
          className="text-primary-500 capitalize text-[11px] ml-2 mt-2"
          style={{fontFamily: 'Inter-Medium'}}>
          {props?.error?.message}
        </Text>
      )}
    </View>
  );
};

export default Input;
