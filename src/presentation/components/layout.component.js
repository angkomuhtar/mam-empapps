import {ScrollView} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {View} from 'native-base';

const Layout = ({children, back = false, title = '', header = false}) => {
  return (
    <View className="flex-1 bg-red-[#fefefe]">
      {header && <Header back={back} title={title} />}
      {children}
    </View>
  );
};

export default Layout;
