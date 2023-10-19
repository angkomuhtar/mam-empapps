import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import HomeBase from './HomeBase';
import AuthBase from './AuthBase';
import {navigationRef} from '@utils/RootNavigation';
import {refreshToken} from '@stores/auth.reducer';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from '@screens/WelcomeScreen';
import Login from '../screens/Login';
import LeaveAdd from '../presentation/screens/leave/leave-add.screen';

const Stack = createNativeStackNavigator();

const MainNavigation = ({navigation}) => {
  const {isLogin, isLoading} = useSelector(state => state.auth);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        if (value !== null) {
          dispatch(refreshToken());
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    getToken();
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <WelcomeScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="welcome"
          options={{headerShown: false}}
          component={WelcomeScreen}
        /> */}
        {isLogin ? (
          <>
            <Stack.Screen
              name="home"
              options={{headerShown: false}}
              component={HomeBase}
            />
            <Stack.Screen name="leave-add" component={LeaveAdd} />
          </>
        ) : (
          <Stack.Screen
            name="auth"
            options={{headershown: false}}
            component={Login}
          />
        )}
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
