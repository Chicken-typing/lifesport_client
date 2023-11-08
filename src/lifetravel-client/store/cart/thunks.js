import { cartServices, productServices } from '@/kytesoft-client/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty, map } from 'lodash';
import { setCart } from './slice';

const getStorageCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart'));
  } catch (error) {
    localStorage.setItem('cart', '[]');
    return [];
  }
};

export const initCartThunk = createAsyncThunk('cart/init', async (_, { dispatch }) => {
  try {
    const items = getStorageCart();
    if (isEmpty(items)) return;

    const ids = map(items, 'productId');
    const response = await cartServices.checkValidCart({ ids });
    dispatch(setCart(items));
  } catch (error) {}
});

export const getProductThunk = createAsyncThunk(
  'cart/getProduct',
  async (slug, { rejectWithValue }) => {
    try {
      const product = await productServices.getProduct({ slug });
      return product;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
