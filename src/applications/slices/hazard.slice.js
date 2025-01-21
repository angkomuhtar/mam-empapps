import {Hazard} from '../navigations';
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
    getHazardDetails: builder.query({
      query: id => `/hazard/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
    }),

    getHazardReport: builder.query({
      query: ({page = 1, status = ''}) =>
        `/hazard/report?page=${page}&status=${status}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['HazardReport'],
    }),
    getHazardReportDetails: builder.query({
      query: id => `/hazard/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['HazardReportDetails'],
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
      invalidatesTags: ['HazardReport', 'HazardReportDetails'],
    }),

    getHazardAction: builder.query({
      query: ({page = 1, status = ''}) =>
        `/hazard/action?page=${page}&status=${status}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['HazardAction'],
    }),
    getHazardActionDetails: builder.query({
      query: id => `/hazard/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['HazardActionDetails'],
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
      invalidatesTags: ['HazardAction', 'HazardActionDetails'],
    }),
  }),
});

export const {
  useGetHazardHistoryQuery,
  useLazyGetHazardHistoryQuery,
  useSetHazardMutation,
  useGetHazardDetailsQuery,
  useGetHazardActionDetailsQuery,
  useGetHazardReportDetailsQuery,
  useGetHazardReportQuery,
  useSetPICMutation,
  useGetHazardActionQuery,
  useSetActionMutation,
} = hazardApiSlice;
