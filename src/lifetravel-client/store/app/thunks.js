import { setToken } from "@/kytesoft-client/request";
import { appServices, authServices, contactServices } from "@/kytesoft-client/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import to from "await-to-js";
import { isEmpty } from "lodash";
import {
  setAppSettings,
  setForgetPasswordCode,
  setForgetPasswordToken,
  setRegisterToken,
  setUserInfo,
} from "./slice";

export const getAppSettingsThunk = createAsyncThunk(
  "app/getAppSettings",
  async (_, { dispatch }) => {
    const [err, resp] = await to(appServices.getAppSettings());
    if (isEmpty(err)) dispatch(setAppSettings(resp));
  }
);

export const getTokenThunk = createAsyncThunk("app/getToken", async () => {
  const [err, resp] = await to(authServices.clientGetToken());
  if (!isEmpty(err)) return;
  setToken(resp?.token);
});

export const getMeThunk = createAsyncThunk("app/getMe", async (_, { dispatch }) => {
  const [err, resp] = await to(authServices.clientGetMe());
  if (!isEmpty(err)) return;
  dispatch(setUserInfo(resp));
});

export const loginThunk = createAsyncThunk(
  "app/login",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, _] = await to(authServices.clientLogin(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }

    await Promise.all(dispatch(getTokenThunk()), dispatch(getMeThunk()));
  }
);

export const logoutThunk = createAsyncThunk(
  "app/logout",
  async (_, { rejectWithValue, dispatch }) => {
    const [err, __] = await to(authServices.clientLogout());
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }

    dispatch(setUserInfo({}));
    setToken(null);
  }
);

export const registerThunk = createAsyncThunk(
  "app/register",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, resp] = await to(authServices.clientRegister(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }
    dispatch(setRegisterToken(resp?.token));
  }
);

export const registerResendOtpThunk = createAsyncThunk(
  "app/register/resendOtp",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, resp] = await to(authServices.clientRegisterResendOtp(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }
    dispatch(setRegisterToken(resp?.token));
  }
);

export const registerVerifyThunk = createAsyncThunk(
  "app/register/verify",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, _] = await to(authServices.clientRegisterVerify(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }
    dispatch(setRegisterToken(null));
  }
);

export const forgetPasswordThunk = createAsyncThunk(
  "app/forgetPassword",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, resp] = await to(authServices.forgetPassword(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }
    dispatch(setForgetPasswordToken(resp?.token));
  }
);

export const forgetPasswordResendOtpThunk = createAsyncThunk(
  "app/forgetPasswordResendOtp",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, resp] = await to(authServices.forgetPasswordResendOtp(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }
    dispatch(setForgetPasswordToken(resp?.token));
  }
);

export const forgetPasswordVerifyThunk = createAsyncThunk(
  "app/forgetPasswordVerify",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, resp] = await to(authServices.forgetPasswordVerify(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }
    dispatch(setForgetPasswordCode(data.code));
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "app/resetPassword",
  async (data, { rejectWithValue, dispatch }) => {
    const [err, _] = await to(authServices.resetPassword(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }

    dispatch(setForgetPasswordCode(null));
    dispatch(setForgetPasswordToken(null));
  }
);

export const createContactThunk = createAsyncThunk(
  "app/createContact",
  async (data, { rejectWithValue }) => {
    const [err, _] = await to(contactServices.createContact(data));
    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }
  }
);

export const subscribeThunk = createAsyncThunk(
  "app/subscribe",
  async (data, { rejectWithValue }) => {
    try {
      await appServices.subscribe(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
