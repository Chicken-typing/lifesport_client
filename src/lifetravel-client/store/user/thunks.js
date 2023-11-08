import { userServices } from "@/kytesoft-client/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changePasswordThunk = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      await userServices.changePassword(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserInfoThunk = createAsyncThunk(
  "user/updateUserInfo",
  async (data, { rejectWithValue }) => {
    try {
      await userServices.updateUserInfo(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
