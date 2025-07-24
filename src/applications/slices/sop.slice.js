import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {LEARN_API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshToken} from '../utils/ApiCall';

// const api_url = PKWT_API_URL

const baseQuery = fetchBaseQuery({
  baseUrl: LEARN_API_URL,
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
  let result = baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const reftoken = await refreshToken();
    if (reftoken) {
      result = await baseQuery(args, api, extraOptions);
    }
  }
  console.log('RTK Query Request URL:', args.url || args);
  console.log('RTK Query Request BaseURL:', LEARN_API_URL);
  return result;
};

export const sopApiSlice = createApi({
  reducerPath: 'sop',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['list-folder'],
  endpoints: builder => ({}),
});

export const sopSlice = sopApiSlice.injectEndpoints({
  endpoints: builder => ({
    getSOPFolder: builder.query({
      query: () => `/sop/sop-folders`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['list-folder'],
    }),
    getFolderDetail: builder.query({
      query: ({id}) => `/sop/sop-folders/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
    }),
  }),
});

export const {useGetSOPFolderQuery, useGetFolderDetailQuery} = sopSlice;
