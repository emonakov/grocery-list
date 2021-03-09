import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from './store';
import { loadState } from '../utils/localStorage';

const persistedState = loadState();

const initialState: GroceryState = {
  items: persistedState?.items || [],
};

export const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addToGroceryList: (
      state: GroceryState,
      action: PayloadAction<GroceryItem>,
    ) => {
      state.items.push({
        ...action.payload,
        id: uuid(),
        statusHistory: [
          {
            status: false,
            date: new Date().toISOString(),
          },
        ],
      });
      state.items.sort(
        (a, b) => a.priority - b.priority || a.title.localeCompare(b.title),
      );
    },
    deleteFromGroceryList: (
      state: GroceryState,
      action: PayloadAction<GroceryItem>,
    ) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    changeGroceryItemState: (
      state: GroceryState,
      action: PayloadAction<GroceryItem>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.statusHistory.push({
          status: action.payload.isHaving,
          date: new Date().toISOString(),
        });
        item.isHaving = action.payload.isHaving;
      }
    },
  },
});

export const {
  addToGroceryList,
  deleteFromGroceryList,
  changeGroceryItemState,
} = slice.actions;

export const selectGroceryItems = (
  state: RootState,
  filter: 'all' | 'have' | 'runout' = 'all',
): GroceryItem[] => {
  if (filter === 'all') {
    return state.items;
  }

  const filterMap = {
    have: true,
    runout: false,
  };

  return state.items.filter((item) => item.isHaving === filterMap[filter]);
};

export const selectGroceryItem = (
  state: RootState,
  id: string,
): GroceryItem | undefined => state.items.find((item) => item.id === id);

export default slice.reducer;
