import {createEntityAdapter} from '@reduxjs/toolkit';
import {apiSlice} from './api.slice';

// const usersAdapter = createEntityAdapter();

// const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => '/me',
      transformResponse: responseData => {
        return responseData.user;
      },
      providesTags: ['Users'],
    }),
    getTeam: builder.query({
      query: () => '/team',
      transformResponse: responseData => {
        return responseData.user;
      },
      // providesTags: ['Users'],
    }),
    getAppVersion: builder.query({
      query: device => '/version?device=' + device,
      transformResponse: responseData => {
        console.log(responseData.data);
        return responseData.data;
      },
      // providesTags: ['Users'],
    }),
    changePass: builder.mutation({
      query: body => ({
        url: `change_password`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
      transformErrorResponse: responseData => {
        return responseData.data;
      },
    }),
    changeAvatar: builder.mutation({
      query: body => ({
        url: `change_avatar`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
      transformErrorResponse: responseData => {
        return responseData.data;
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useChangePassMutation,
  useChangeAvatarMutation,
  useGetTeamQuery,
  useGetAppVersionQuery,
} = usersApiSlice;
