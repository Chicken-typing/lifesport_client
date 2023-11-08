import { orderServices } from "@/kytesoft-client/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const cancelOrderThunk = createAsyncThunk(
  "order/cancelOrder",
  async (data, { rejectWithValue }) => {
    try {
      return await orderServices.cancelOrder(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
