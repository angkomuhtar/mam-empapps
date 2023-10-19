import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient, apiPublic, errHandle} from '../applications/utils/ApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export const refreshToken = createAsyncThunk('auth/refresh', async thunkAPI => {
  try {
    const response = await apiClient.post('/auth/refresh');
    await AsyncStorage.setItem('token', response.data.authorisation.token);
    return response.data;
  } catch (error) {
    // return error;
    return thunkAPI.rejectWithValue(errHandle(error));
  }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await apiPublic.post('/auth/login', data);
    await AsyncStorage.setItem('token', response.data.authorisation.token);
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify(response.data.user),
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errHandle(error));
  }
});

export const logout = createAsyncThunk('auth/logout', async thunkAPI => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const expired = createAsyncThunk('auth/expired', async thunkAPI => {
  return true;
  // try {
  //   const response = await apiClient.get('/auth/logout');
  // } catch (err) {
  //   return thunkAPI.rejectWithValue(err.response.data);
  // }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isLogin: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(refreshToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
      })
      /// LOGIN
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /// LOGOUT
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(expired.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
      });
  },
});

export default authSlice.reducer;
