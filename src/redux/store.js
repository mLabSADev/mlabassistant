import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import accountReducer from './userAccountSlice';
export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
