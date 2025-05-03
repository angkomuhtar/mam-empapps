import {View} from 'react-native';
import React from 'react';
import Layout from '@components/layout.component';
import {VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import AddSleep from './add-sleep.screen';
import ListSleep from './list-sleep.screen';

const Tab = createMaterialTopTabNavigator();
const SleepScreen = () => {
  return (
    <Layout>
      <VStack className="px-5 pt-2">
        <Header title="Durasi Tidur" back={true} />
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
          name="add-sleep"
          options={{tabBarLabel: 'Tambah Jam Tidur'}}
          component={AddSleep}
        />
        <Tab.Screen
          name="history-sleep"
          options={{tabBarLabel: 'Riwayat Jam Tidur'}}
          component={ListSleep}
        />
      </Tab.Navigator>
    </Layout>
  );
};

export default SleepScreen;
