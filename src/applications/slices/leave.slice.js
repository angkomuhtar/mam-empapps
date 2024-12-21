import {apiSlice} from './api.slice';

const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLeaves: builder.query({
      query: () => 'leave',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Leave', id})),
              {type: 'Leave', id: 'LIST'},
            ]
          : [{type: 'Leave', id: 'LIST'}],
    }),
    getLeaveType: builder.query({
      query: () => 'leave/leave_type',
      transformResponse: response => {
        return response.data;
      },
    }),
    addLeave: builder.mutation({
      query: body => ({
        url: `leave`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Leave', id: 'LIST'}],
    }),
    getLeave: builder.query({
      query: id => `leave/${id}`,
      providesTags: (result, error, id) => [{type: 'Leave', id}],
    }),
    updateLeave: builder.mutation({
      query: body => ({
        url: `leave/change_status`,
        method: 'POST',
        body: body,
      }),

      async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getLeave', id, draft => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: 'Leave', id}],
    }),
    getLeaveRequest: builder.query({
      query: () => '/leave/leave_request/request',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: 'LeaveReq',
    }),
    getLeaveRequestHistory: builder.query({
      query: () => '/leave/leave_request/history',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: 'LeaveReqHist',
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `leave/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{type: 'Leave', id}],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useLazyGetLeavesQuery,
  useAddLeaveMutation,
  useGetLeaveTypeQuery,
  useLazyGetLeaveRequestQuery,
  useLazyGetLeaveRequestHistoryQuery,
  useUpdateLeaveMutation,
} = leaveApiSlice;
