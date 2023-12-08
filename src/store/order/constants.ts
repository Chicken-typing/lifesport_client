export interface IOrder {
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

export const initialState: IOrder[] = [];
