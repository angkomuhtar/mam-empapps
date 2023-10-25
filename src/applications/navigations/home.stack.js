import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabHome from './tab-home.stack';
import LeaveAdd from '@screens/leave/leave-add.screen';
import LeaveDetails from '@screens/leave/leave-details.screen';
import ChangePassword from '@screens/settings/password.screen';
import Profile from '@screens/settings/profile.screen';

const Stack = createNativeStackNavigator();

const HomeBase = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TabHome} name="home" />
      <Stack.Screen component={LeaveAdd} name="leave-add" />
      <Stack.Screen component={LeaveDetails} name="leave-details" />
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
