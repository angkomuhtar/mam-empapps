import {apiSlice} from './api.slice';

export const todayApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRekap: builder.query({
      query: () => '/clock/rekap',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Rekap'],
    }),
  }),
});

export const {useGetRekapQuery} = todayApiSlice;
