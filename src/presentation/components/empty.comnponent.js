import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {VStack} from 'native-base';

const Empty = () => {
  return (
    <VStack space="5" className="flex-1 justify-center items-center">
      <LottieView
        style={{
          height: 150,
          width: '100%',
        }}
        source={require('../assets/images/empty.json')}
        autoPlay
        loop
      />
      <Text
        className="font-semibold text-lg text-primary-900 -mt-5 capitalize"
        style={{fontFamily: 'Montserrat-Bold'}}>
        Tidak Ada data
      </Text>
    </VStack>
  );
};

export default Empty;
