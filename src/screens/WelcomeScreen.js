import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import Logo from '@images/logo-land.png';

const WelcomeScreen = ({navigation}) => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar />
      <View className="flex-1 py-5">
        <View className="flex-1 justify-center items-center">
          <Image source={Logo} className="w-40" resizeMode="contain" />
        </View>
        <View className="py-5">
          <Text
            className="text-center"
            style={{fontFamily: 'OpenSans-SemiBold'}}>
            PT. Mitra Abadi Mahakam
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
