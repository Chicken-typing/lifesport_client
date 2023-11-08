import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.auth || {}),
    }));
  },
});

export default authSlice;
