export interface CartDetail {
  product: {
    name: string;
    price: number;
    id: number;
    quantity: number;
    thumbnail: string;
    color: string;
  };
  quantity: number;
  total: number;
}

export const initialState: CartDetail[] = [];
