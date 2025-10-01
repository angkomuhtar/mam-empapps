import {View} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import Layout from '@components/layout.component';
import {goBack} from '@utils/RootNavigation';
import LeaveForm from './leave-form.screen';
import LeaveHistory from './leave-history.screen';

const Tab = createMaterialTopTabNavigator();

const LeaveScreen = () => {
  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header back={true} title="Pengajuan Cuti" />
      </View>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
        backBehavior={() => goBack()}
        tabBar={props => (
          <View
            className="px-5
            ">
            <TabBar {...props} />
          </View>
        )}>
        <Tab.Screen
          name="leave-form"
          options={{tabBarLabel: 'Buat Pengajuan'}}
          component={LeaveForm}
        />
        <Tab.Screen
          name="leave-history"
          options={{tabBarLabel: 'Riwayat Pengajuan'}}
          component={LeaveHistory}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default LeaveScreen;
