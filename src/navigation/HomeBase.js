import {View, Text, Platform} from 'react-native';
import React from 'react';
import BottomTabButton from '@components/navigation/bottom-tab-button.component';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import History from '../screens/History';
import Settings from '../screens/Settings';
import Check from '../screens/Check';
import {TextMontserrat} from '../component/Text';
import Leave from '../presentation/screens/leave/Leave';

const Tab = createBottomTabNavigator();

const HomeBase = () => {
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
        component={Check}
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

export default HomeBase;
