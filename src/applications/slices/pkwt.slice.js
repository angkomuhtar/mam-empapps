import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PKWT_API_URL} from '@env';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const api_url = PKWT_API_URL

const baseQuery = fetchBaseQuery({
  baseUrl: PKWT_API_URL,
  credentials: 'include',
  prepareHeaders: async headers => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = (args, api, extraOptions) => {
  let result = baseQuery(args, api, extraOptions);
  console.log('RTK Query Request URL:', args.url || args);
  console.log('RTK Query Request BaseURL:', PKWT_API_URL);
  return result;
};

export const pkwtApiSlice = createApi({
  reducerPath: 'pkwt',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['pkwt-list', 'cuti-list', 'cuti-detail'],
  endpoints: builder => ({}),
});

export const PkwtSlice = pkwtApiSlice.injectEndpoints({
  endpoints: builder => ({
    getPkwtList: builder.query({
      query: ({page = 1, user_id}) => `/list-contracts?user_id=${user_id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['pkwt-list'],
    }),
    signedPkwt: builder.mutation({
      query: body => ({
        url: `signed-contracts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['pkwt-list'],
      transformErrorResponse: responseData => {
        return responseData.data;
      },
    }),
    getCutiList: builder.query({
      query: ({page = 1, status = ''}) =>
        `/my-absences?page=${page}&status=${status}`,
      transformErrorResponse: responseData => {
        return responseData;
      },
      providesTags: ['cuti-list'],
    }),
    getCutiKuota: builder.query({
      query: ({date}) => `/my-absences/create?dateFrom=${date}`,
      transformErrorResponse: responseData => {
        return responseData;
      },
    }),
    getCutiDetail: builder.query({
      query: ({id}) => `/my-absences/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      transformErrorResponse: responseData => {
        return responseData;
      },
      providesTags: ['cuti-detail'],
    }),
    applyLeave: builder.mutation({
      query: body => ({
        url: `my-absences`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cuti-list'],
      transformErrorResponse: responseData => {
        return responseData.data;
      },
    }),
  }),
});

export const {
  useGetPkwtListQuery,
  useSignedPkwtMutation,
  useGetCutiListQuery,
  useGetCutiKuotaQuery,
  useLazyGetCutiKuotaQuery,
  useApplyLeaveMutation,
  useGetCutiDetailQuery,
} = PkwtSlice;
