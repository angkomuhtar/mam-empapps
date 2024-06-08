import React, {useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {navigationRef} from '@utils/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';

// screen
import Splash from '@screens/auth/splash.screen';
import {refresh} from '../actions/auth.action';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import HomeBase from './home.stack';
import AuthBase from './auth.stack';

// const asynctoken = await AsyncStorage.getItem('token');

const MainNavigation = ({navigation}) => {
  const {getItem} = useAsyncStorage('@token');
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const {isLogin, error, success, refLoading} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
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
    setTimeout(() => {
      setloading(false);
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
