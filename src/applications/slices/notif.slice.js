import {apiSlice} from './api.slice';

const notifApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    registerToken: builder.mutation({
      query: body => ({
        url: `notification/register`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {useRegisterTokenMutation} = notifApiSlice;
