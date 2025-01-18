import {apiSlice} from './api.slice';

export const sleepApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSleep: builder.query({
      query: ({page}) => ({
        url: '/sleep?page=' + page,
        method: 'GET',
      }),
      transformResponse: responseData => {
        return responseData.data;
      },
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['Sleep', 'Today'],
    }),
    setSleep: builder.mutation({
      query: data => ({
        url: '/sleep',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['Sleep', 'Today'],
    }),
  }),
});

export const {useSetSleepMutation, useLazyGetSleepQuery, useGetSleepQuery} =
  sleepApiSlice;
