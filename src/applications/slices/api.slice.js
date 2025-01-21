import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL, APP_ENV, API_URL_DEV_IOS, API_URL_DEV_AND} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshToken} from '../utils/ApiCall';

const api_url =
  APP_ENV == 'production'
    ? API_URL
    : Platform.OS == 'android'
    ? API_URL_DEV_AND
    : API_URL_DEV_IOS;

const baseQuery = fetchBaseQuery({
  baseUrl: api_url,
  credentials: 'include',
  prepareHeaders: async headers => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const reftoken = await refreshToken();
    if (reftoken) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  console.log('RTK Query Request URL:', args.url || args);
  console.log('RTK Query Request BaseURL:', api_url);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Users',
    'Today',
    'Rekap',
    'Sleep',
    'History',
    'Leave',
    'Login',
    'Division',
    'Project',
    'Location',
    'Hazard',
    'HazardDetails',
    'HazardReport',
    'HazardReportDetails',
    'HazardAction',
    'HazardActionDetails',
  ],
  endpoints: builder => ({}),
});
