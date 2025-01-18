import {apiSlice} from './api.slice';

export const hazardApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getHazardHistory: builder.query({
      query: ({page = 1, status = ''}) =>
        `/hazard?page=${page}&status=${status}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Hazard'],
    }),
    getHazardReport: builder.query({
      query: ({page = 1, status = ''}) =>
        `/hazard/report?page=${page}&status=${status}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['HazardRequest'],
    }),
    getHazardDetails: builder.query({
      query: id => `/hazard/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
    }),
    getHazardAction: builder.query({
      query: ({page = 1, status = ''}) =>
        `/hazard/action?page=${page}&status=${status}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['HazardAction'],
    }),
    setHazard: builder.mutation({
      query: data => ({
        url: '/hazard',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['Hazard'],
    }),
    setPIC: builder.mutation({
      query: ({id, body}) => ({
        url: `/hazard/${id}/pic`,
        method: 'POST',
        body: body,
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['HazardRequest'],
    }),
    setAction: builder.mutation({
      query: body => ({
        url: `/hazard/action`,
        method: 'POST',
        body: body,
      }),
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['HazardAction'],
    }),
  }),
});

export const {
  useGetHazardHistoryQuery,
  useLazyGetHazardHistoryQuery,
  useSetHazardMutation,
  useGetHazardDetailsQuery,
  useGetHazardReportQuery,
  useSetPICMutation,
  useGetHazardActionQuery,
  useSetActionMutation,
} = hazardApiSlice;
