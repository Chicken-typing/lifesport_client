import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, IOrder } from './constants';
import { IUser } from '@interfaces/user';
import { cookieStorage } from '@utils/cookieStorage';
import { findIndex } from 'lodash';
import { decodeToken } from '@utils/decode';
import { stat } from 'fs';
const token = cookieStorage?.getAccessTokenInfo();
export interface PayloadType {
  id_order: number;
  user_id: string;
  checkout_id: number;
  checkout_link: string;
  created: string;
  expires_at: string;
  total: number;
  list_items: [
    {
      color: string;
      quantity: number;
      product_id: number;
      checkout_id: number;
    },
  ];
}
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<PayloadType>) => {
      const decoded = decodeToken(token || '');
      const currenUser = state.find((item) => item.user_id === decoded?.id);
      console.log(currenUser);
      if (!currenUser) {
        state.push({
          user_id: action.payload.user_id,
          id_order: action.payload.id_order,
          checkout_id: action.payload.checkout_id,
          checkout_link: action.payload.checkout_link,
          created: action.payload.created,
          expires_at: action.payload.expires_at,
          total: action.payload.total,
          list_items: action.payload.list_items,
        });
      } else {
        state.push({
          user_id: action.payload.user_id,
          id_order: action.payload.id_order,
          checkout_id: action.payload.checkout_id,
          checkout_link: action.payload.checkout_link,
          created: action.payload.created,
          expires_at: action.payload.expires_at,
          total: action.payload.total,
          list_items: action.payload.list_items,
        });
      }
    },
  },
});

export const { addToOrder } = orderSlice.actions;
export default orderSlice;
