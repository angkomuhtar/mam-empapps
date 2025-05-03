import {View, Text} from 'react-native';
import React from 'react';
import Layout from '@components/layout.component';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import HazardReportOpen from '@screens/request-and-approval/hazard/hazard-report-list.screen';
import InspectReportList from './inspection-report-list.screen';

const Tab = createMaterialTopTabNavigator();

const InspectionReport = () => {
  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header back={true} title="Inspection Card" />
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
          name="hazard-open"
          options={{tabBarLabel: 'OPEN', focusedBackground: 'bg-red-500'}}
          component={InspectReportList}
          initialParams={{status: 'created'}}
        />
        <Tab.Screen
          name="hazard-done"
          options={{tabBarLabel: 'DONE', focusedBackground: 'bg-green-500'}}
          component={InspectReportList}
          initialParams={{status: 'verified'}}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default InspectionReport;
