import {configureStore} from '@reduxjs/toolkit';
import loginSlice from '@slices/login.slice';
import homeReducer from '@slices/home.slice';
import {apiSlice} from '@slices/api.slice';
import filterSlice from '@slices/filter.slice';
import {pkwtApiSlice} from './slices/contract.slice';
import {sopApiSlice} from './slices/sop.slice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    home: homeReducer,
    filter: filterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [pkwtApiSlice.reducerPath]: pkwtApiSlice.reducer,
    [sopApiSlice.reducerPath]: sopApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(pkwtApiSlice.middleware)
      .concat(sopApiSlice.middleware),
  devTools: true,
});
