import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = {};
    },

    setAppSettings: (state, { payload }) => {
      state.appSettings = payload;
    },

    setRegisterToken: (state, { payload }) => {
      state.registerToken = payload;
    },

    setForgetPasswordToken: (state, { payload }) => {
      state.forgetPasswordToken = payload;
    },
    setForgetPasswordCode: (state, { payload }) => {
      state.forgetPasswordCode = payload;
    },
  },
});

export const {
  setAppSettings,
  setUserInfo,
  clearUserInfo,
  setRegisterToken,
  setForgetPasswordToken,
  setForgetPasswordCode,
} = appSlice.actions;

export default appSlice;
