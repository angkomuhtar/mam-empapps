import {View, Text, Platform, Dimensions, Image} from 'react-native';
import React from 'react';
import {Spinner, VStack} from 'native-base';

const Loading = () => {
  return (
    <VStack
      space="5"
      className="bg-white/70 absolute left-0 right-0 z-50 justify-center items-center"
      style={{height: Dimensions.get('screen').height}}>
      <Spinner size={45} color="primary.500" />
      <Text className="font-semibold text-lg text-primary-200">
        Mohon Tunggu
      </Text>
    </VStack>
  );
};

export default Loading;
