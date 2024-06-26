import {createSlice} from '@reduxjs/toolkit';
import {login, refresh, logout} from '../actions/auth.action';

const initialState = {
  loading: false,
  refLoading: false,
  error: null,
  token: null,
  success: false,
  isLogin: false,
  users: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.isLogin = true;
      state.token = payload.authorisation.token;
      state.users = payload.user;
    },
    [login.rejected]: (state, {payload}) => {
      state.loading = false;
      state.isLogin = false;
      state.error = payload;
    },
    [refresh.pending]: state => {
      state.refLoading = true;
      state.error = null;
    },
    [refresh.fulfilled]: (state, {payload}) => {
      state.refLoading = false;
      state.isLogin = true;
      state.success = true;
      state.token = payload.authorisation.token;
      state.users = payload.user;
    },
    [refresh.rejected]: (state, {payload}) => {
      state.isLogin = false;
      state.refLoading = false;
      state.error = payload;
    },
    [logout.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [logout.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.token = null;
      state.isLogin = false;
      state.users = {};
    },
    [logout.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;

export const accessToken = state => state.auth.token;
export const userData = state => state.auth.users;
