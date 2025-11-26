import {apiSlice} from './api.slice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    setLogIn: builder.mutation({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      // invalidatesTags: ['Today', 'History', 'Rekap'],
    }),
    setLogOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: [
        'Users',
        'Today',
        'Rekap',
        'History',
        'Leave',
        'Login',
        'Hazard',
        'Division',
        'Project',
        'Location',
        'HazardAction',
      ],
    }),
    getMe: builder.query({
      query: () => 'clock/rekap',
      overrideExisting: true,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Rekap'],
    }),
  }),
});

export const {useSetLogInMutation, useGetMeQuery, useSetLogOutMutation} =
  authApiSlice;
