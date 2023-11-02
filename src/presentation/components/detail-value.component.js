import {View, Text} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';

const DetailValue = ({label, value}) => {
  const ValueArray = ({data}) => {
    return (
      <HStack className="justify-between items-center" space={2}>
        <View className="flex-1">
          <Text
            style={{fontFamily: 'Inter-Medium'}}
            className="text-base text-primary-950">
            {data[0]}
          </Text>
        </View>
        <Text
          style={{fontFamily: 'Inter-Medium'}}
          className="text-base text-primary-950">
          s/d
        </Text>
        <View className="bg-white rounded-md p-4 flex-1">
          <Text
            style={{fontFamily: 'Inter-Medium'}}
            className="text-base text-primary-950">
            {data[1]}
          </Text>
        </View>
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
      {Array.isArray(value) ? (
        <ValueArray data={value} />
      ) : (
        <View className="">
          <Text
            style={{fontFamily: 'OpenSans-Medium'}}
            className="text-md text-primary-950">
            {value}
          </Text>
        </View>
      )}
    </VStack>
  );
};

export default DetailValue;
