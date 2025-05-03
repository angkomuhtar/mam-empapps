import {apiSlice} from './api.slice';

export const InspectApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInspectType: builder.query({
      query: () => '/inspection/type',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['InspectionType'],
    }),
    getInspectHistory: builder.query({
      query: ({page = 1, status = ''}) =>
        `/inspection/history?page=${page}&status=${status}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['InspectionHistory'],
    }),

    getInspectReport: builder.query({
      query: ({page = 1, status = ''}) =>
        `/inspection/report?page=${page}&status=${status}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['InspectionReport'],
    }),
    getInspectQuestion: builder.query({
      query: ({type}) => `/inspection/${type}/question`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['InspectionQuestion'],
    }),
    getInspectDetail: builder.query({
      query: ({id}) => `/inspection/${id}/detail`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['InspectionDetail'],
    }),
    sendInspection: builder.mutation({
      query: data => ({
        url: '/inspection',
        method: 'POST',
        body: data,
      }),
      transformResponse: responseData => {
        console.log('responseData', responseData);

        return responseData.data;
      },
      transformErrorResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['InspectionHistory'],
    }),
    getInspectionCount: builder.query({
      query: () => `/inspection/count`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['HazardCount'],
    }),
  }),
});

export const {
  useGetInspectTypeQuery,
  useGetInspectQuestionQuery,
  useSendInspectionMutation,
  useGetInspectHistoryQuery,
  useGetInspectionCountQuery,
  useGetInspectDetailQuery,
  useGetInspectReportQuery,
} = InspectApiSlice;
