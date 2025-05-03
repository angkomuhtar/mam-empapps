import {View} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import Layout from '@components/layout.component';
import InspectionList from './inspection-list.screen';
import InspectionHistory from './inspection-history.screen';

const Tab = createMaterialTopTabNavigator();

const Hazard = () => {
  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header back={true} title="Kartu Inspeksi" />
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
          name="inspection-list"
          options={{tabBarLabel: 'Buat Inspeksi Baru'}}
          component={InspectionList}
        />
        <Tab.Screen
          name="inspection-history"
          options={{tabBarLabel: 'Riwayat Inspeksi'}}
          component={InspectionHistory}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default Hazard;
