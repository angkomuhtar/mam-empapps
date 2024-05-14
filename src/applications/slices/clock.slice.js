import {apiSlice} from './api.slice';

export const clockApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getToday: builder.query({
      query: () => '/clock/today',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Today'],
    }),
    setClockIn: builder.mutation({
      query: data => ({
        url: '/clock',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['Today', 'History', 'Rekap'],
    }),
    getClock: builder.query({
      query: month => {
        console.log('data from Slice:', month);
        return {
          url: `/clock/${month}/history`,
          // params: '',
        };
      },
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['History'],
    }),
    getShift: builder.query({
      query: () => 'clock/shift',
      transformResponse: responseData => {
        return responseData;
      },
    }),
    getAbsenLocation: builder.query({
      query: () => 'clock/location',
      transformResponse: responseData => {
        return responseData.data;
      },
    }),
    getClockRecap: builder.query({
      query: () => 'clock/rekap',
      overrideExisting: true,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Rekap'],
    }),
  }),
});

export const {
  useGetTodayQuery,
  useGetClockQuery,
  useSetClockInMutation,
  useGetShiftQuery,
  useGetAbsenLocationQuery,
  useGetClockRecapQuery,
} = clockApiSlice;
