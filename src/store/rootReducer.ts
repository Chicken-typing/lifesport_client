import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app/slice';
import authSlice from './auth/slice';
import blogsSlice from './blogs/slice';
import contactUsSlice from './contactUs/slice';
import homeSlice from './home/slice';
import orderSlice from './order/slice';
import modalSlice from './modals/slice';
import drawerSlice from './drawers/slice';
import cartSlice from './cart/slice';
import userSlice from './user/slice';

export const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [blogsSlice.name]: blogsSlice.reducer,
  [contactUsSlice.name]: contactUsSlice.reducer,
  [homeSlice.name]: homeSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [drawerSlice.name]: drawerSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});
