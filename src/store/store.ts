import { configureStore } from '@reduxjs/toolkit';

import groceriesReducer from './slice';
import { loadState } from '../utils/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: groceriesReducer,
  preloadedState: persistedState,
});

export type RootState = ReturnType<typeof store.getState>;
