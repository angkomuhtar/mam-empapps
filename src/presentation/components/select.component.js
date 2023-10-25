import {View, Text} from 'react-native';
import React from 'react';
import {HStack, Select, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

const SelectField = ({onChange, value, placeholder, label, option}) => {
  return (
    <HStack className="border border-primary-100 py-2 px-4 rounded-md bg-white">
      <VStack className="flex-1">
        <Text
          className="text-xs text-primary-950 capitalize"
          style={{fontFamily: 'Inter-Regular'}}>
          {label}
        </Text>
        <View className="py-3">
          <RNPickerSelect
            value={value}
            onValueChange={onChange}
            items={option}
          />
        </View>
      </VStack>
      <View className="justify-center items-center">
        <Icon name="chevron-down-outline" size={25} />
      </View>
    </HStack>
  );
};

export default SelectField;
