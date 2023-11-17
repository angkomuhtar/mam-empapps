import {View, Text, Platform} from 'react-native';
import React from 'react';
import {HStack, Select, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';

const SelectField = ({
  onChange,
  value,
  placeholder,
  valueField = 'value',
  labelField = 'label',
  label,
  option = [],
}) => {
  const renderItem = item => (
    <HStack className="py-3 px-4 justify-between items-center">
      <Text
        className="text-sm text-primary-950 capitalize"
        style={{fontFamily: 'Inter-Medium'}}>
        {item[labelField]}
      </Text>
      {item[valueField] === value && (
        <Icon color="black" name="checkmark-done" size={20} />
      )}
    </HStack>
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
              textTransform: 'capitalize',
            }}
            data={option}
            search={false}
            maxHeight={500}
            labelField={labelField}
            valueField={valueField}
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
