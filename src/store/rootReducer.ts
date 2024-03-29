import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app/slice';
import authSlice from './auth/slice';
import blogsSlice from './blogs/slice';
import contactUsSlice from './contactUs/slice';
import homeSlice from './home/slice';
import modalSlice from './modals/slice';
import drawerSlice from './drawers/slice';
import userSlice from './user/slice';
import cartUserSlice from './cartUser/slice';

export const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [blogsSlice.name]: blogsSlice.reducer,
  [contactUsSlice.name]: contactUsSlice.reducer,
  [homeSlice.name]: homeSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [drawerSlice.name]: drawerSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [cartUserSlice.name]: cartUserSlice.reducer,
});
