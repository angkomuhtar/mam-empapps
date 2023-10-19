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
  }),
});

export const {useGetProfileQuery} = usersApiSlice;
