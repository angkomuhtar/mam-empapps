import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '@screens/WelcomeScreen';
import Login from '@screens/Login';

const Stack = createNativeStackNavigator();

const AuthBase = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="login"
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default AuthBase;
