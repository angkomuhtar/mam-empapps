import {View, Text, TextInput, Platform} from 'react-native';
import React from 'react';
import {HStack, VStack, Radio as RadioN} from 'native-base';

const Radio = props => {
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
          <RadioN.Group
            {...elprops}
            // value={props.value}
            // onChange={nextValue => {
            //   props.onChange(nextValue);
            // }}
            accessibilityLabel="favorite number"
            style={{display: 'flex', flexDirection: 'column'}}>
            <RadioN value="one" my={1}>
              One
            </RadioN>
            <RadioN value="two" my={1}>
              Two
            </RadioN>
          </RadioN.Group>
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

export default Radio;
