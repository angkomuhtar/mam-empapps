import {View, Text, Platform, Dimensions, Image} from 'react-native';
import React from 'react';
import {Spinner, VStack} from 'native-base';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <VStack
      space="5"
      className="bg-white/90 absolute left-0 right-0 z-50 justify-center items-center"
      style={{height: Dimensions.get('screen').height}}>
      <LottieView
        style={{
          height: 200,
          width: '100%',
        }}
        source={require('../assets/images/plane.json')}
        autoPlay
        loop
      />
      <Text
        className="font-semibold text-lg text-primary-900 -mt-16"
        style={{fontFamily: 'Montserrat-Bold'}}>
        Mohon Tunggu
      </Text>
    </VStack>
  );
};

export default Loading;
