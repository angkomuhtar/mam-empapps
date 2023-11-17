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
import ApprovalLeave from '../../presentation/screens/other/approval/leave/approval-leave.screen';
import ApprovalAbsen from '../../presentation/screens/other/approval/absen/approval-absen.screen';
import ApprovalOvertime from '../../presentation/screens/other/approval/overtime/approval-overtime.screen';
import ApprovalClaim from '../../presentation/screens/other/approval/claims/approval-claims.screen';

const Tab = createBottomTabNavigator();
const ApprovalTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <View>
          <TabBottom {...props} size="9px" />
        </View>
      )}
      screenOptions={{
        tabBarActiveTintColor: '#fb3640',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="approval-leave"
        component={ApprovalLeave}
        options={{
          headerShown: false,
          title: 'cuti / ijin',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                size={15}
                icon={focused ? 'ios-walk' : 'ios-walk-outline'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="approval-absen"
        component={ApprovalAbsen}
        options={{
          headerShown: false,
          title: 'lupa Absen',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                size={15}
                icon={focused ? 'ios-calendar' : 'ios-calendar-outline'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="approval-overtime"
        component={ApprovalOvertime}
        options={{
          title: 'lembur',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                size={15}
                icon={focused ? 'ios-speedometer' : 'ios-speedometer-outline'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="approval-claims"
        component={ApprovalClaim}
        options={{
          title: 'claims',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabButton
                color={color}
                size={15}
                text="AKUN"
                icon={focused ? 'wallet' : 'wallet-outline'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default ApprovalTab;
