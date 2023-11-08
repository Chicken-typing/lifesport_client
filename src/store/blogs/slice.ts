import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.blogs || {}),
    }));
  },
});

export default blogsSlice;
