import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      localStorage.setItem("cart", JSON.stringify(payload));
      state.items = payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice;
