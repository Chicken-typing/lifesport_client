import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const homeSlice = createSlice({
  name: 'home',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.home || {}),
    }));
  },
});

export default homeSlice;
