import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {View} from 'native-base';

const Layout = ({children, bg = false}) => {
  return (
    <View className="flex-1 bg-[#fafafa]">
      <SafeAreaView className={`${bg ? bg : 'bg-transparent'}`} />
      <StatusBar backgroundColor={'#fafafa'}></StatusBar>
      {children}
    </View>
  );
};

export default Layout;
