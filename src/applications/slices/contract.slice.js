import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PKWT_API_URL} from '@env';

// const api_url = PKWT_API_URL

const baseQuery = fetchBaseQuery({
  baseUrl: PKWT_API_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    return headers;
  },
});

const baseQueryWithReauth = (args, api, extraOptions) => {
  let result = baseQuery(args, api, extraOptions);
  console.log('RTK Query Request URL:', args.url || args);
  console.log('RTK Query Request BaseURL:', PKWT_API_URL);
  return result;
};

export const pkwtApiSlice = createApi({
  reducerPath: 'pkwt',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['pkwt-list'],
  endpoints: builder => ({}),
});

export const PkwtSlice = pkwtApiSlice.injectEndpoints({
  endpoints: builder => ({
    getPkwtList: builder.query({
      query: ({page = 1, user_id}) => `/list-contracts?user_id=${user_id}`,
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['pkwt-list'],
    }),
  }),
});

export const {useGetPkwtListQuery} = PkwtSlice;
