import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient, errHandle} from '../applications/utils/ApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';

// get history by id
export const getHistory = createAsyncThunk('clock/history', async thunkAPI => {
  try {
    const response = await apiClient.get('/clock');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errHandle(error));
  }
});

// Post clock in
export const postClock = createAsyncThunk(
  'clcok/post',
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post('/clock', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errHandle(error));
    }
  },
);

// get today history
export const todayClock = createAsyncThunk('clcok/today', async thunkAPI => {
  try {
    const response = await apiClient.get('/clock/today');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errHandle(error));
  }
});

// get location list
export const getLocation = createAsyncThunk(
  'clcok/location',
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.get('/clock/location');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errHandle(error));
    }
  },
);
export const getShift = createAsyncThunk(
  'clcok/shift',
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.get('/clock/shift');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errHandle(error));
    }
  },
);

const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    isLoading: false,
    error: null,
    success: null,
    history: null,
    ab_location: null,
    shift: null,
    today: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      /// LOGIN
      .addCase(getHistory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.history = null;
        state.success = null;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload.data;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //
      .addCase(todayClock.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
        state.today = null;
      })
      .addCase(todayClock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.today = action.payload.data;
      })
      .addCase(todayClock.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //
      .addCase(postClock.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(postClock.fulfilled, (state, action) => {
        console.log('frompayload', action.payload);
        state.isLoading = false;
        state.today = action.payload.data;
        state.success = {
          message: action.payload.message,
        };
      })
      .addCase(postClock.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getLocation.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ab_location = action.payload.data;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shift = action.payload.data;
      });
  },
});

export default clockSlice.reducer;
