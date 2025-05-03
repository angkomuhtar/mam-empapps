import {apiSlice} from './api.slice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => '/me',
      transformResponse: responseData => {
        return responseData.user;
      },
      providesTags: ['Users'],
    }),
    getTeam: builder.query({
      query: () => '/team',
      transformResponse: responseData => {
        return responseData.user;
      },
    }),
    getAppVersion: builder.query({
      query: device => '/version?device=' + device,
      transformResponse: responseData => {
        return responseData.data;
      },
    }),
    changePass: builder.mutation({
      query: body => ({
        url: `change_password`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
      transformErrorResponse: responseData => {
        return responseData.data;
      },
    }),
    changeAvatar: builder.mutation({
      query: body => ({
        url: `change_avatar`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
      transformErrorResponse: responseData => {
        return responseData.data;
      },
    }),
    searchPic: builder.query({
      query: ({name}) => ({
        url: `/pic?name=${name}`,
        method: 'GET',
      }),
      transformResponse: responseData => {
        return responseData.data;
      },
      transformErrorResponse: responseData => {
        return responseData.data;
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useChangePassMutation,
  useChangeAvatarMutation,
  useGetTeamQuery,
  useGetAppVersionQuery,
  useSearchPicQuery,
} = usersApiSlice;
