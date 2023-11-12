import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { initialState, CartDetail } from './constants';
import { IProduct } from '@interfaces/product';
import { map, filter, findIndex } from 'lodash';

interface PayloadType {
  product: {
    name: string;
    price: number;
    id: string;
    quantity: number;
    thumbnail: string;
    color: string;
  };
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartList: (state, action: PayloadAction<CartDetail[]>) => {
      return (state = action.payload);
    },

    addProduct: (state, action: PayloadAction<PayloadType>) => {
      const currentIndex = state.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.product.color === action.payload.product.color,
      );
      if (currentIndex === -1) {
        state.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
          total: action.payload.product.price * action.payload.quantity,
        });
      } else {
        if (state[currentIndex].quantity < state[currentIndex].product.quantity) {
          state[currentIndex].quantity += action.payload.quantity;
          state[currentIndex].total =
            state[currentIndex].quantity * state[currentIndex].product.price;
        } else {
          console.log('Sản phẩm trong kho không đủ!');
        }
      }
      localStorage.setItem('carts', JSON.stringify(state));
    },

    removeProduct: (state, action: PayloadAction<{ id: string; color: string }>) => {
      let newCart = filter(
        state,
        ({ product }) => product.id !== action.payload.id || product.color !== action.payload.color,
      );
      localStorage.setItem('carts', JSON.stringify(newCart));
      return newCart;
    },

    increment: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const updateCart = map(state, (item) =>
        item.product.id === action.payload.id && item.product.color === action.payload.color
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.product.price,
            }
          : item,
      );
      localStorage.setItem('carts', JSON.stringify(updateCart));
      return updateCart;
    },

    decrement: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const updateCart = map(state, (item) =>
        item.product.id === action.payload.id && item.product.color === action.payload.color
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: (item.quantity - 1) * item.product.price,
            }
          : item,
      );
      localStorage.setItem('carts', JSON.stringify(updateCart));
      return updateCart;
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number; color: string }>,
    ) => {
      const updateCart = map(state, (item) =>
        item.product.id === action.payload.id && item.product.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
      localStorage.setItem('carts', JSON.stringify(updateCart));
      return updateCart;
    },

    blurQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number; color: string }>,
    ) => {
      const currentIndex = findIndex(
        state,
        (item) =>
          item.product.id === action.payload.id && item.product.color === action.payload.color,
      );
      if (state[currentIndex].product.quantity >= action.payload.quantity) {
        const updateCart = map(state, (item) =>
          item.product.id === action.payload.id && item.product.color === action.payload.color
            ? {
                ...item,
                quantity: action.payload.quantity <= 0 ? 1 : action.payload.quantity,
                total:
                  action.payload.quantity <= 0
                    ? state[currentIndex].total
                    : item.product.price * action.payload.quantity,
              }
            : item,
        );
        localStorage.setItem('carts', JSON.stringify(updateCart));
        return updateCart;
      } else {
        const updateCart = map(state, (item) =>
          item.product.id === action.payload.id && item.product.color === action.payload.color
            ? {
                ...item,
                quantity: state[currentIndex].product.quantity,
                total: item.product.price * state[currentIndex].product.quantity,
              }
            : item,
        );
        localStorage.setItem('carts', JSON.stringify(updateCart));
        return updateCart;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => ({
      ...(state || {}),
      ...(action?.payload?.cart || {}),
    }));
  },
});

export const {
  getCartList,
  addProduct,
  removeProduct,
  increment,
  decrement,
  changeQuantity,
  blurQuantity,
} = cartSlice.actions;

export default cartSlice;
