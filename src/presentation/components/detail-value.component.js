import {View, Text} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Octicons';

const DetailValue = ({label, value, icon = null}) => {
  const ValueArray = ({data}) => {
    return (
      <HStack className="items-center" space={2}>
        <Text
          style={{fontFamily: 'OpenSans-Medium'}}
          className="text-sm text-primary-950">
          {data[0]}
        </Text>
        <Text
          style={{fontFamily: 'OpenSans-Medium'}}
          className="text-base text-center text-primary-950">
          -
        </Text>
        <Text
          style={{fontFamily: 'OpenSans-Medium'}}
          className="text-sm text-primary-950">
          {data[1]}
        </Text>
      </HStack>
    );
  };

  return (
    <VStack
      space={2}
      className="bg-white p-3 rounded-lg border border-primary-100">
      <Text
        className="text-md text-primary-950 capitalize"
        style={{fontFamily: 'Inter-Light'}}>
        {label}
      </Text>
      <HStack className="items-center" space={2}>
        {icon && (
          <Icon name="verified" size={14} className="mr-2" color="#22c55e" />
        )}
        {Array.isArray(value) ? (
          <ValueArray data={value} />
        ) : (
          <View className="">
            <Text
              style={{fontFamily: 'OpenSans-Medium'}}
              className="text-sm text-primary-950">
              {value}
            </Text>
          </View>
        )}
      </HStack>
    </VStack>
  );
};

export default DetailValue;
