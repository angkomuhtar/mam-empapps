import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {setCredentials, logOut} from './auth.slice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://10.0.3.2:8000/api/v1',
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
  tagTypes: ['Users', 'Today', 'Rekap', 'History', 'Leave'],
  endpoints: builder => ({}),
});
