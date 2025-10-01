import React, {useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {navigationRef} from '@utils/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';

// screen
import Splash from '@screens/auth/splash.screen';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import HomeBase from './home.stack';
import AuthBase from './auth.stack';
import {setLogin} from '@slices/login.slice';
import {refreshToken} from '../utils/ApiCall';

const MainNavigation = ({navigation}) => {
  const {getItem} = useAsyncStorage('@token');
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const {isLoggedIn} = useSelector(state => state.login);

  useEffect(() => {
    setloading(true);
    const getToken = async () => {
      try {
        const value = await getItem();
        if (value) {
          const tok = await refreshToken();
          if (tok) {
            dispatch(setLogin(true));
          }
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      } finally {
        setTimeout(() => {
          setloading(false);
        }, 1000);
      }
    };
    getToken();
  }, [navigation]);

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? <HomeBase /> : <AuthBase />}
    </NavigationContainer>
  );
};

export default MainNavigation;
