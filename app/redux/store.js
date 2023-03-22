import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import accountReducer from './userAccountSlice';
import appReducer from './app';
export const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
