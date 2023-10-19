import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabHome from './tab-home.stack';
import LeaveAdd from '@screens/leave/leave-add.screen';

const Stack = createNativeStackNavigator();

const HomeBase = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TabHome} name="home" />
      <Stack.Screen component={LeaveAdd} name="leave-add" />
      <Stack.Screen component={LeaveAdd} name="leave-details" />
    </Stack.Navigator>
  );
};

export default HomeBase;
