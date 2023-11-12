import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { IUser } from '@interfaces/user';
import { cookieStorage } from '@utils/cookieStorage';
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
      state.user_infos = {
        user_id: '',
        address: '',
        city: '',
        country: '',
        created_at: '',
        phone_number: '',
        province: '',
        street: '',
        updated_at: '',
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
