import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from '../utils/ApiCall';

export const getHome = createAsyncThunk(
  'home',
  async (data, {rejectWithValue}) => {
    try {
      const response = await apiClient.get('/home');
      return response.data.data;
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
