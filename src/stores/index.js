import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user.reducer';
import authReducer from './auth.reducer';
import clockReducer from './clock.reducer';
import homeReducer from './home.reducer';

export const store = configureStore({
  reducer: {
    members: userReducer,
    auth: authReducer,
    clock: clockReducer,
    home: homeReducer,
  },
});
