import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const productsSlice = createSlice({
  name: 'products',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.products || {}),
    }));
  },
});

export default productsSlice;
