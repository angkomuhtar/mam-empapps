import {View, Text, Platform} from 'react-native';
import React from 'react';
import {HStack, Select, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';

const SelectField = ({onChange, value, placeholder, label, option}) => {
  const renderItem = item => (
    <View className="py-3 px-4">
      <Text
        className="text-sm text-primary-950"
        style={{fontFamily: 'Inter-Medium'}}>
        {item.label}
      </Text>
      {item.value === value && <Icon color="black" name="camera" size={20} />}
    </View>
  );

  return (
    <HStack className="border border-primary-100 rounded-md bg-white">
      <VStack className="flex-1">
        <Text
          className="text-xs text-primary-950 capitalize px-4 pt-2"
          style={{fontFamily: 'Inter-Regular'}}>
          {label}
        </Text>
        <View className={`py-1`}>
          <Dropdown
            className="px-4 "
            placeholderStyle={{
              color: '#cacaca',
              fontFamily: 'Inter-Light',
              fontSize: 13,
            }}
            selectedTextStyle={{
              color: '#490609',
              fontFamily: 'OpenSans-Light',
              fontSize: 14,
            }}
            data={option}
            search={false}
            maxHeight={500}
            labelField="label"
            valueField="value"
            placeholder="pilih salah satu"
            value={value}
            onChange={onChange}
            renderRightIcon={() => (
              <Icon name="chevron-down-outline" size={25} />
            )}
            renderItem={renderItem}
          />
        </View>
      </VStack>
    </HStack>
  );
};

export default SelectField;
