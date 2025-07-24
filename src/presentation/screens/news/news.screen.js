import {ScrollView, View} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {VStack} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Layout from '@components/layout.component';
import HazardReportOpen from '../request-and-approval/hazard/hazard-report-list.screen';
import TabBar from '../../components/navigation/tab-bar.component';
import NewsListScreen from './news-list.screen';
import SopListScreen from './sop-list.screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SopDetailsScreen from './sop-details.screen';
import AnnounceListScreen from './announce-list.screen';

const Tab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();

const ListStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="list-folder-sop"
      component={SopListScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="detail-folder-sop"
      component={SopDetailsScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const News = () => {
  return (
    <Layout bg={false}>
      <View className="px-4 py-2">
        <Header
          back={false}
          title="Berita & Informasi"
          rightIcon={false}
          className=""
        />
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
          name="news-list"
          options={{tabBarLabel: 'Berita', focusedBackground: 'bg-red-500'}}
          component={NewsListScreen}
          initialParams={{status: 'open', search: 'abdul'}}
        />
        <Tab.Screen
          name="hazard-onprogress"
          options={{
            tabBarLabel: 'Informasi',
            focusedBackground: 'bg-yellow-500',
          }}
          component={AnnounceListScreen}
          initialParams={{status: 'progress', search: ''}}
        />
        <Tab.Screen
          name="hazard-done"
          options={{tabBarLabel: 'S.O.P', focusedBackground: 'bg-green-500'}}
          component={ListStack}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default News;
