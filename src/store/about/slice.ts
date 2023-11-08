import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const aboutSlice = createSlice({
  name: 'about',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.about || {}),
    }));
  },
});

export default aboutSlice;
