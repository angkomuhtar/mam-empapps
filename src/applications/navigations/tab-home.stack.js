import {View, Text} from 'react-native';
import React from 'react';
import BottomTabButton from '@components/navigation/bottom-tab-button.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@screens/home/home.screen';
import History from '@screens/history/history.screen';
import Settings from '@screens/settings/setting.screen';
import Other from '@screens/other/other.screen';
import Absen from '@screens/absen/absen.screen';
import TabBottom from '../../presentation/components/navigation/tab-bottom.component';

const Tab = createBottomTabNavigator();
const TabHome = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <View>
          <TabBottom {...props} />
        </View>
      )}
      screenOptions={{
        tabBarActiveTintColor: '#fb3640',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Beranda',
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
          title: 'riwayat',
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
          title: 'absen',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                <View
                  style={{backgroundColor: '#fb3640'}}
                  className="absolute -top-11 flex flex-row items-center p-2 rounded-full border-4 border-[#fefefe]">
                  <Icon name={'ios-barcode-outline'} size={33} color="#fff" />
                </View>
                <View style={{height: 16}}></View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="others"
        component={Other}
        options={{
          title: 'Lainnya',
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
          title: 'akun',
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
