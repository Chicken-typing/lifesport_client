import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultLightBoxData, defaultLightBoxState, initialState, MODALS } from './constants';

interface PayloadType {
  view: keyof typeof MODALS;
  lightBoxData?: defaultLightBoxState;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<PayloadType>) => {
      state.isOpen = true;
      state.view = action.payload.view;
      state.lightBoxData = action.payload.lightBoxData || defaultLightBoxData;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice;
