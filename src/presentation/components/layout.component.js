import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {View} from 'native-base';
import {AlertProvider} from '../../applications/hooks/useAlert';

const Layout = ({children, bg = false}) => {
  return (
    <View className="flex-1 bg-[#fafafa]">
      {/* <SafeAreaView /> */}
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      {children}
    </View>
  );
};

export default Layout;
