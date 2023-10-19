import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@slices/auth.slice';
import homeReducer from '@slices/home.slice';
import {apiSlice} from '@slices/api.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
