import {View, Text, TextInput, Platform} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';

const Input = props => {
  const elprops = Object.fromEntries(
    Object.entries(props).filter(([key, value]) => {
      if (key !== 'rightIcon' || key !== 'title' || key !== 'inputStyle') {
        return key => value;
      }
    }),
  );

  return (
    <HStack className="border border-primary-300 py-2 px-4 rounded-md">
      <VStack className="flex-1">
        <Text
          className="text-xs text-primary-950"
          style={{fontFamily: 'Inter-Regular'}}>
          {props.title}
        </Text>
        <TextInput
          {...elprops}
          className={`${
            Platform.OS == 'ios' ? 'py-2' : 'py-0'
          } text-primary-950 text-sm`}
          style={[{fontFamily: 'Inter-Light'}, props.inputStyle]}
        />
      </VStack>
      <View className="justify-center items-center">{props?.rightIcon}</View>
    </HStack>
  );
};

export default Input;
