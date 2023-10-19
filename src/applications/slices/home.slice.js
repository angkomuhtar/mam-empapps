const {createSlice} = require('@reduxjs/toolkit');
import {getHome} from '../actions/home.action';

const initialState = {
  loading: false,
  error: null,
  data: null,
  success: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [getHome.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getHome.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    },
    [getHome.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default homeSlice.reducer;
