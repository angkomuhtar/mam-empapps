import {apiSlice} from './api.slice';

export const sleepApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    setSleep: builder.mutation({
      query: data => ({
        url: '/sleep',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['Today'],
    }),
  }),
});

export const {useSetSleepMutation} = sleepApiSlice;
