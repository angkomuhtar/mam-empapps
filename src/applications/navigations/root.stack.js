import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {navigationRef} from '@utils/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';

// screen
import Splash from '@screens/auth/splash.screen';
import {Text, View} from 'react-native';
import {refresh} from '../actions/auth.action';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import HomeBase from './home.stack';
import AuthBase from './auth.stack';
import {getVersion} from 'react-native-device-info';
import {apiClient} from '../utils/ApiCall';
const Stack = createNativeStackNavigator();

// const asynctoken = await AsyncStorage.getItem('token');

const MainNavigation = ({navigation}) => {
  const {getItem} = useAsyncStorage('@token');
  const [version, setVersion] = useState('');
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const {isLogin, error, success, refLoading} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    let version = getVersion();
    const getToken = async () => {
      try {
        const value = await getItem();
        if (value) {
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

  if (loading || refLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isLogin ? <HomeBase /> : <AuthBase />}
    </NavigationContainer>
  );
};

export default MainNavigation;
