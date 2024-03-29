import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {navigationRef} from '@utils/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';

// screen
import Splash from '@screens/auth/splash.screen';
import Login from '@screens/auth/login.screen';
import {Text, View} from 'react-native';
import {refresh} from '../actions/auth.action';
import {accessToken} from '../slices/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeBase from './home.stack';
import AuthBase from './auth.stack';
import {getVersion} from 'react-native-device-info';

const Stack = createNativeStackNavigator();

const MainNavigation = ({navigation}) => {
  const token = useSelector(accessToken);
  const [version, setVersion] = useState('');
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let version = getVersion();
    console.log('this is version', version);
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          dispatch(refresh());
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    getToken();
  }, [navigation]);

  useEffect(() => {
    const getversion = async () => {};
    setTimeout(() => {
      setloading(false);
      getversion();
    }, 2000);
  }, []);

  const HOME = () => {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  };

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <HomeBase /> : <AuthBase />}
    </NavigationContainer>
  );
};

export default MainNavigation;
