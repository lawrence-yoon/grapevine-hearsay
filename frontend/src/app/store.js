import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import secretReducer from '../features/secrets/secretSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    secrets: secretReducer

  },
});
