import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient, errHandle} from '../applications/utils/ApiCall';

// Post clock in
export const getHome = createAsyncThunk('home', async thunkAPI => {
  try {
    const response = await apiClient.get('/home');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errHandle(error));
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isLoading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      /// LOGIN
      .addCase(getHome.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        console.log('berhasil');
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getHome.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.data = null;
      });
  },
});

export default homeSlice.reducer;
