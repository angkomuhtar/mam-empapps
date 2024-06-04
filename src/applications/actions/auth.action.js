import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient, apiPublic} from '../utils/ApiCall';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';

const {setItem, removeItem} = useAsyncStorage('@token');

export const login = createAsyncThunk(
  'auth/login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await apiPublic.post(`auth/login`, data);
      await setItem(response.data.authorisation.token);
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
      await setItem(response.data.authorisation.token);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response);
        return rejectWithValue(error.response);
      } else if (error.request) {
        console.log('Error request:', error.request);
        return rejectWithValue(error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async thunkAPI => {
  try {
    const response = await apiClient.post('/auth/logout');
    await removeItem();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
