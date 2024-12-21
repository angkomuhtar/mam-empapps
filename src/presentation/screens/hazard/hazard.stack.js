import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import {goBack, push} from '@utils/RootNavigation';
import Layout from '@components/layout.component';
import HazardAdd from './hazard-add.screen';
import HazardHistory from './hazard-history.screen';

const Tab = createMaterialTopTabNavigator();

const Button = ({icon, onPress, title}) => (
  <Pressable onPress={onPress}>
    <HStack
      className="px-3 py-2 bg-white shadow-sm shadow-primary-950/20 items-center rounded-md"
      space={3}>
      {icon}
      <Text
        className="flex-1 text-primary-950 text-sm capitalize"
        style={{fontFamily: 'OpenSans-SemiBold'}}>
        {title}
      </Text>
      <Entypo name="chevron-right" size={25} color={'rgb(73, 6, 9)'} />
    </HStack>
  </Pressable>
);

const Hazard = () => {
  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header back={true} title="Pelaporan Bahaya" />
      </View>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
        backBehavior={() => navigate('home')}
        tabBar={props => (
          <View
            className="px-5
          ">
            <TabBar {...props} />
          </View>
        )}>
        <Tab.Screen
          name="hazard-add"
          options={{tabBarLabel: 'Laporan Baru'}}
          component={HazardAdd}
        />
        <Tab.Screen
          name="leaveList"
          options={{tabBarLabel: 'Riwayat Laporan'}}
          component={HazardHistory}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default Hazard;
