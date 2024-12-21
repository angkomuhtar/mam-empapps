import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabHome from './tab-home.stack';
import LeaveAdd from '@screens/other/leave/leave-add.screen';
import LeaveDetails from '@screens/other/leave/leave-details.screen';
import ChangePassword from '@screens/settings/password.screen';
import Profile from '@screens/settings/profile.screen';
import Leave from '@screens/other/leave/leave.screen';
import ApprovalTab from './approval-tab.stack';
import AddSleep from '@screens/home/add-sleep.screen';
import Hazard from '@screens/hazard/hazard.stack';
import HazardList from '../../presentation/screens/hazard/hazard-list.stack';

const Stack = createNativeStackNavigator();

const HomeBase = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TabHome} name="home" />
      <Stack.Screen component={AddSleep} name="add-sleep" />
      <Stack.Screen component={Leave} name="leave" />
      <Stack.Screen component={LeaveAdd} name="leave-add" />
      <Stack.Screen component={LeaveDetails} name="leave-details" />
      <Stack.Screen component={ApprovalTab} name="approval-request" />

      {/* hazard report */}
      <Stack.Screen component={Hazard} name="hazard" />
      <Stack.Screen component={HazardList} name="hazard-list" />

      {/* settings */}
      <Stack.Screen component={ChangePassword} name="change-password" />
      <Stack.Screen component={ChangePassword} name="edit-profile" />
      <Stack.Screen component={Profile} name="my-profile" />
      <Stack.Screen component={ChangePassword} name="term-condition" />
      <Stack.Screen component={ChangePassword} name="privacy-policy" />
    </Stack.Navigator>
  );
};

export default HomeBase;
