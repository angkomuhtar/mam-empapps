import {View, Text} from 'react-native';
import React from 'react';
import {HStack, Select, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const SelectField = ({onChange, value, placeholder, label}) => {
  return (
    <HStack className="border border-primary-300 py-2 px-4 rounded-md">
      <VStack className="flex-1">
        <Text
          className="text-xs text-primary-950 capitalize"
          style={{fontFamily: 'Inter-Regular'}}>
          {label}
        </Text>
        <Select
          borderWidth={0}
          py={Platform.OS == 'ios' ? '2' : '0'}
          px="0"
          dropdownIcon={() => <></>}
          selectedValue={value}
          minWidth="200"
          accessibilityLabel={placeholder}
          placeholder={placeholder}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <Icon name="checkmark-done-outline" size={25} />,
          }}
          mt={1}
          onValueChange={onChange}>
          <Select.Item label="Cuti Tahunan" value="annual" />
          <Select.Item label="Cuti Periodik" value="periodik" />
          <Select.Item label="Sakit" value="sick" />
          <Select.Item label="Ijin" value="permit" />
          <Select.Item label="Cuti Melahirkan" value="maternity" />
          <Select.Item label="Cuti Haid" value="menstruation" />
          <Select.Item label="Cuti Alasan Penting" value="other" />
        </Select>
      </VStack>
      <View className="justify-center items-center">
        <Icon name="chevron-down-outline" size={25} />
      </View>
    </HStack>
  );
};

export default SelectField;
