import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@screens/auth/login.screen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="auth"
        options={{headershown: false}}
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
