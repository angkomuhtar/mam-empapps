import axios from 'axios';
import {API_URL, APP_ENV, API_URL_DEV_IOS, API_URL_DEV_AND} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

const api_url =
  APP_ENV == 'production'
    ? API_URL
    : Platform.OS == 'android'
    ? 'http://10.0.3.2:8000/api/v1'
    : API_URL_DEV_IOS;
console.log('Environment', APP_ENV);
export const apiClient = axios.create({
  baseURL: api_url,
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const apiPublic = axios.create({
  baseURL: api_url,
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

apiClient.interceptors.request.use(async function (config, data) {
  const token = await AsyncStorage.getItem('@token');
  if (token) {
    let {exp} = jwtDecode(token);
    if (exp < moment().format('X')) {
      await apiPublic
        .post('auth/refresh', {Authorization: 'Bearer ' + token})
        .then(async ({data}) => {
          await AsyncStorage.setItem('@token', data.accessToken);
          config.headers['Authorization'] = 'Bearer ' + data.accessToken;
        })
        .catch(err => {
          console.log(err.toJSON());
          console.log('error in intercept');
        });
    } else {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
  }
  return config;
});

export const errHandle = error => {
  var err = {};
  console.log(error);
  if (error.response) {
    err = {
      status: error.response.data.Error,
      msg: error.response.data.message,
      statusCode: error.response.data.status,
    };
  } else if (error.request) {
    err = {
      status: 'Error in Request you send',
      msg: error.request,
      statusCode: 500,
    };
  } else {
    err = {
      status: 'Error in Request you send',
      statusCode: 500,
      msg: error.message,
    };
  }
  console.log(error.config);
  return err;
};
