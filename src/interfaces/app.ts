export interface IAnyObject {
  [key: string]: any;
}

export interface IQueryOptionsList {
  page?: number;
  limit?: number;
}

export interface IQueryResultList<T> {
  items: T[];
  total: number;
}

export interface IQueryResultDetail<T> {
  item: T[];
}

export interface IQueryResultDetail<T> {
  items: T[];
}

export interface IQueryResultDetail<T> {
  data: T;
}

export interface IQueryResultStatistics {
  status: string;
  data: [
    {
      revenue: string;
      revenue_interval: string;
    },
  ];
}

export interface IQueryResultInvoices {
  status: string;
  messaage: string;
  order_lists: [
    {
      id: number;
      payment_intent: string;
      shipping_method: string;
      email: string;
      name: string;
      phone: string;
      address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
      };
      currency: string;
      amount_subtotal: number;
      amount_total: number;
      invoice_id: string;
      shipping_cost: number;
      payment_status: string;
      paid_at: string;
      outbound: boolean;
      delivered_at: string;
      ordered_items: [
        {
          brand: string;
          color: string;
          quantity: number;
          amount_tax: number;
          product_id: string;
          amount_total: number;
          product_name: string;
          amount_discount: number;
          amount_subtotal: number;
        },
      ];
    },
  ];
}

export interface IOrders {
  id: number;
  payment_intent: string;
  shipping_method: string;
  email: string;
  name: string;
  phone: string;
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
  currency: string;
  amount_subtotal: number;
  amount_total: number;
  invoice_id: string;
  shipping_cost: number;
  payment_status: string;
  paid_at: string;
  outbound: boolean;
  delivered_at: string;
  ordered_items: [
    {
      brand: string;
      color: string;
      quantity: number;
      amount_tax: number;
      product_id: string;
      image: string;
      amount_total: number;
      product_name: string;
      amount_discount: number;
      amount_subtotal: number;
    },
  ];
  invoice_pdf: string;
  invoice_link: string;
}
export interface IQueryResultUserInvoices {
  order_lists: IOrders[];
}

export interface IUpdate {
  id: number;
  deliver: boolean;
}

export interface ResponseCheckout {
  status: string;
  url: string;
}

export interface IQueryResultOrderTemp {
  data: [
    {
      id: number;
      user_id: string;
      checkout_id: number;
      checkout_link: string;
      created: string;
      expires_at: string;
      total: number;
      list_items: [
        {
          name: string;
          color: string;
          price: number;
          quantity: number;
          thumbnail: string;
        },
      ];
    },
  ];
}

export interface IQueryResultCart {
  data: [
    {
      id: string;
      name: string;
      quantity: string;
      thumbnail: string;
      price: number;
      color: string;
      qty: number;
      is_achieve: boolean;
    },
  ];
}
