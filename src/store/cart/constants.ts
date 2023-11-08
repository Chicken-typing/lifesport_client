import { IProduct } from '@interfaces/product';

export interface CartDetail {
  product: IProduct;
  quantity: number;
  total: number;
}

export const initialState: CartDetail[] = [];
