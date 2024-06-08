import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL, APP_ENV, API_URL_DEV_IOS, API_URL_DEV_AND} from '@env';
// import {setCredentials, logOut} from './auth.slice';

const api_url =
  APP_ENV == 'production'
    ? API_URL
    : Platform.OS == 'android'
    ? 'http://10.0.3.2:8000/api/v1'
    : API_URL_DEV_IOS;
const baseQuery = fetchBaseQuery({
  baseUrl: api_url,
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Users', 'Today', 'Rekap', 'History', 'Leave', 'Login'],
  endpoints: builder => ({}),
});
