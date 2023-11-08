import { addressServices } from "@/kytesoft-client/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAddressThunk = createAsyncThunk(
  "address/getAddress",
  async (data, { rejectWithValue }) => {
    try {
      return await addressServices.getAddress(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAddressThunk = createAsyncThunk(
  "address/addAddress",
  async (data, { rejectWithValue }) => {
    try {
      return await addressServices.addAddress(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAddressThunk = createAsyncThunk(
  "address/deleteAddress",
  async (data, { rejectWithValue }) => {
    try {
      return await addressServices.deleteAddress(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProvinceThunk = createAsyncThunk(
  "address/getProvince",
  async (_, { rejectWithValue }) => {
    try {
      return await addressServices.getProvince();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDistrictThunk = createAsyncThunk(
  "address/getDistrict",
  async (data, { rejectWithValue }) => {
    try {
      return await addressServices.getDistrict(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getWardThunk = createAsyncThunk(
  "address/getWard",
  async (data, { rejectWithValue }) => {
    try {
      return await addressServices.getWard(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
