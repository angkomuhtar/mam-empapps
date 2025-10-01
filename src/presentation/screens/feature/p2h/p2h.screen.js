import {View, Text} from 'react-native';
import React from 'react';
import Layout from '../../../components/layout.component';
import {VStack} from 'native-base';
import Header from '../../../components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import P2hFormScreen from './p2h-form.screen';
import TabBar from '../../../components/navigation/tab-bar.component';

const Tab = createMaterialTopTabNavigator();

const P2hScreen = () => {
  return (
    <Layout>
      <VStack className="px-5 pt-2">
        <Header title="Form P2H" back={true} />
      </VStack>
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
          name="p2h-form"
          options={{tabBarLabel: 'P2H Baru'}}
          component={P2hFormScreen}
        />
        <Tab.Screen
          name="hazard-list"
          options={{tabBarLabel: 'History P2H'}}
          component={P2hFormScreen}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default P2hScreen;
