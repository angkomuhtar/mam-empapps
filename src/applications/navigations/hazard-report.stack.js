import {View, Text} from 'react-native';
import React from 'react';
import Layout from '../../presentation/components/layout.component';
import Header from '../../presentation/components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '../../presentation/components/navigation/tab-bar.component';
import HazardReportOpen from '../../presentation/screens/request-and-report/hazard-report/hazard-report-open.screen';

const Tab = createMaterialTopTabNavigator();

const HazardReport = () => {
  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header back={true} title="Hazard Report" />
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
          component={HazardReportOpen}
          initialParams={{status: 'open'}}
        />
        <Tab.Screen
          name="hazard-onprogress"
          options={{
            tabBarLabel: 'ON PROGRESS',
            focusedBackground: 'bg-yellow-500',
          }}
          component={HazardReportOpen}
          initialParams={{status: 'progress'}}
        />
        <Tab.Screen
          name="hazard-done"
          options={{tabBarLabel: 'DONE', focusedBackground: 'bg-green-500'}}
          component={HazardReportOpen}
          initialParams={{status: 'close'}}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default HazardReport;
