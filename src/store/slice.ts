import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from './store';

const initialState: GroceryState = {
  items: [],
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
    changeState: (state: GroceryState, action: PayloadAction<GroceryItem>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.statusHistory.push([action.payload.isHaving, new Date()]);
        item.isHaving = action.payload.isHaving;
      }
    },
  },
});

export const { addToGroceryList, deleteFromGroceryList } = slice.actions;

export const selectGroceryItems = (state: RootState): GroceryItem[] =>
  state.items;

export default slice.reducer;
