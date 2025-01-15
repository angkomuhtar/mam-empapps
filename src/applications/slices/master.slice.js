import {apiSlice} from './api.slice';

export const masterApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCompany: builder.query({
      query: () => '/master/company',
      transformResponse: responseData => {
        return responseData.data;
      },
      invalidatesTags: ['Division', 'Project'],
    }),
    getHazardLocation: builder.query({
      query: () => '/master/hazard_location',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Location'],
    }),
    getProject: builder.query({
      query: id => `/master/project/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Project'],
    }),
    getDivision: builder.query({
      query: id => `/master/division/${id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Division'],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useLazyGetDivisionQuery,
  useLazyGetProjectQuery,
  useGetHazardLocationQuery,
} = masterApiSlice;
