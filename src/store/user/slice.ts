import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { IUser } from '@interfaces/user';
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user_infos = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
