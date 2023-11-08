import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./app/slice";
import cartSlice from "./cart/slice";
import userSlice from "./user/slice";

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export default rootReducer;
