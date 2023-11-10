export interface CartDetail {
  product: {
    name: string;
    price: number;
    id: string;
    quantity: number;
    thumbnail: string;
    color: string;
  };
  quantity: number;
  total: number;
}

export const initialState: CartDetail[] = [];
