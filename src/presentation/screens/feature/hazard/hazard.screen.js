import {View} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import Layout from '@components/layout.component';
import HistoryHazard from './history-hazard.screen';
import AddHazard from './add-hazard.screen';

const Tab = createMaterialTopTabNavigator();

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
          component={AddHazard}
        />
        <Tab.Screen
          name="hazard-list"
          options={{tabBarLabel: 'Riwayat Laporan'}}
          component={HistoryHazard}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default Hazard;
