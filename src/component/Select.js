import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {VStack} from 'native-base';

const Select = props => {
  return (
    <VStack className="border border-primary-300 py-2 px-4 rounded-md">
      <Text
        className="text-xs text-primary-950"
        style={{fontFamily: 'Inter-Regular'}}>
        {props.title}
      </Text>
      <View className="relative">
        <TextInput
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          className={`${
            Platform.OS == 'ios' ? 'py-2' : 'py-0'
          } text-primary-950 text-sm`}
          style={{fontFamily: 'Inter-Light'}}
        />
        {props?.children}
      </View>
    </VStack>
  );
};

export default Select;
