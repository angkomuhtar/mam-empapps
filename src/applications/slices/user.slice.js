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
      //   providesTags: (result, error, arg) => [
      //     {type: 'User', id: 'LIST'},
      //     // ...result.ids.user.map(id => ({type: 'User', id})),
      //   ],
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
} = usersApiSlice;
