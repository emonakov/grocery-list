import { configureStore } from '@reduxjs/toolkit';
import groceriesReducer from './slice';

export const store = configureStore({
  reducer: groceriesReducer,
});

export type RootState = ReturnType<typeof store.getState>;
