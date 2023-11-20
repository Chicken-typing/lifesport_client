export interface PriceData {
  currency: string;
  product_data: {
    name: string;
    description?: string;
    images: string[];
    metadata: {
      color: string;
      product_id: string;
    };
    tax_code: string;
  };
  unit_amount: number;
}

export interface LineItem {
  quantity: number;
  price_data: PriceData;
}

export interface Product {
  id: string;
  line_item: LineItem[];
}

export interface ICheckout {
  email: string;
  products: Product[];
}
