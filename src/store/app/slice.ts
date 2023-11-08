import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { initialState } from './constants';

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.app || {}),
    }));
  },
});

export default appSlice;
