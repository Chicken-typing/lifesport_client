import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, DRAWERS, ANCHORS } from './constants';

interface PayloadType {
  view: keyof typeof DRAWERS;
  anchor?: keyof typeof ANCHORS;
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<PayloadType>) => {
      state.isOpen = true;
      state.view = action.payload.view;
      state.anchor = action.payload.anchor;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice;
