import {View, Text} from 'react-native';
import React from 'react';
import BottomTabButton from '@components/navigation/bottom-tab-button.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@screens/home/home.screen';
import History from '@screens/history/history.screen';
import Settings from '@screens/settings/setting.screen';
import Leave from '@screens/leave/leave.screen';
import Absen from '@screens/absen/absen.screen';

const Tab = createBottomTabNavigator();
const TabHome = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fb3640',
        tabBarStyle: {
          height: Platform.OS == 'ios' ? 90 : 70,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                text="Beranda"
                icon={focused ? 'ios-home' : 'ios-home-outline'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                text="riwayat"
                icon={focused ? 'today' : 'today-outline'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Absen"
        component={Absen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View className="relative flex flex-col items-center ">
                <View
                  style={{backgroundColor: '#fb3640'}}
                  className="flex flex-row items-center p-2 rounded-full -top-7 border-4 border-primary-50">
                  <Icon name={'ios-barcode-outline'} size={33} color="#fff" />
                </View>
                <Text
                  className={`${
                    Platform.OS == 'ios' ? 'bottom-1' : 'bottom-[10px]'
                  } text-[11px] uppercase mt-1 absolute`}
                  style={{color: color, fontFamily: 'Inter-Bold'}}>
                  Absen
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="leaves"
        component={Leave}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                text="Izin"
                icon={focused ? 'ios-apps' : 'ios-apps-outline'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                text="AKUN"
                icon={focused ? 'settings' : 'settings-outline'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabHome;
