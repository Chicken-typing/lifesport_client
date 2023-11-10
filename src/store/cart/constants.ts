import { IProduct } from '@interfaces/product';

export interface CartDetail {
  product: {
    name: string;
    price: number;
    id: string;
    quantity: number;
    thumbnail: string;
  };
  quantity: number;
  total: number;
}

export const initialState: CartDetail[] = [];
