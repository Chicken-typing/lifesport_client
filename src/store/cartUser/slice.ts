import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { initialState, CartDetail } from './constants';
import { IProduct } from '@interfaces/product';
import { map, filter, findIndex } from 'lodash';

interface PayloadType {
  id: string;
  qty: number;
  color: string;
}

const cartUserSlice = createSlice({
  name: 'cartUser',
  initialState,
  reducers: {
    getCarts: (state, action: PayloadAction<CartDetail[]>) => {
      return (state = action.payload);
    },

    addCart: (state, action: PayloadAction<PayloadType>) => {
      const currentIndex = state.findIndex(
        (item) => item.id === action.payload.id && item.color === action.payload.color,
      );
      if (currentIndex === -1) {
        state.push(action.payload);
      } else {
        state[currentIndex].qty += action.payload.qty;
      }
      localStorage.setItem('cartUser', JSON.stringify(state));
    },
    removeCart: (state, action: PayloadAction<{ id: string; color: string }>) => {
      let newCart = filter(
        state,
        (item) => item.id !== action.payload.id || item.color !== action.payload.color,
      );
      localStorage.setItem('cartUser', JSON.stringify(newCart));
      return newCart;
    },

    incrementCart: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const updateCart = map(state, (item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item,
      );
      localStorage.setItem('cartUser', JSON.stringify(updateCart));
      return updateCart;
    },

    decrementCart: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const updateCart = map(state, (item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item,
      );
      localStorage.setItem('cartUser', JSON.stringify(updateCart));
      return updateCart;
    },

    clearCart: (state) => {
      localStorage.removeItem('cartUser');
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.cart || []),
    }));
    builder.addCase(clearCart, (state) => {
      localStorage.removeItem('cartsUser');
      return initialState;
    });
  },
});

export const { getCarts, addCart, removeCart, incrementCart, decrementCart, clearCart } =
  cartUserSlice.actions;

export default cartUserSlice;
