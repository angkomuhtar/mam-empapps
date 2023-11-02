import {apiSlice} from './api.slice';

const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLeaves: builder.query({
      query: () => 'leave',
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Post', id})),
              {type: 'Leave', id: 'LIST'},
            ]
          : [{type: 'Leave', id: 'LIST'}],
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
      query: id => `leaves/${id}`,
      providesTags: (result, error, id) => [{type: 'Leave', id}],
    }),
    updateLeave: builder.mutation({
      query: ({id, ...patch}) => ({
        url: `leave/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          api.util.updateQueryData('getLeave', id, draft => {
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

export const {useAddLeaveMutation} = leaveApiSlice;
