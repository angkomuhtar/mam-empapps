import {View} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import Layout from '@components/layout.component';
import HazardActionList from '@screens/hazard-action/hazard-action-list.screen';

const Tab = createMaterialTopTabNavigator();

const HazardAction = () => {
  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header back={true} title="Penanganan Bahaya" />
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
          component={HazardActionList}
          initialParams={{status: 'onprogress'}}
        />
        <Tab.Screen
          name="hazard-list"
          options={{tabBarLabel: 'Laporan Selesai'}}
          component={HazardActionList}
          initialParams={{status: 'close'}}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default HazardAction;
