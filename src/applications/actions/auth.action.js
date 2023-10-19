import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient, apiPublic} from '../utils/ApiCall';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'auth/login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await apiPublic.post(`auth/login`, data);
      await AsyncStorage.setItem('token', response.data.authorisation.token);
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify(response.data.user),
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
        store;
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (data, {rejectWithValue}) => {
    try {
      const response = await apiClient.post('/auth/refresh');
      await AsyncStorage.setItem('token', response.data.authorisation.token);
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify(response.data.user),
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
        store;
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async thunkAPI => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
