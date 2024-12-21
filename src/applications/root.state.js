import {configureStore} from '@reduxjs/toolkit';
import loginSlice from '@slices/login.slice';
import homeReducer from '@slices/home.slice';
import {apiSlice} from '@slices/api.slice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    home: homeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
