export interface IAnyObject {
  [key: string]: any;
}

export interface IQueryOptionsList {
  page?: number;
  limit?: number;
}

export interface IQueryResultList<T> {
  items: T[];
  status: string;
  url: string;
}

export interface IQueryResultDetail<T> {
  item: T[];
  status: string;
  url: string;
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
      id: string;
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
  id: string;
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
  status: string;
  required_refund_at: string;
}
export interface IQueryResultUserInvoices {
  order_lists: IOrders[];
}

export interface IUpdate {
  id: string;
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
  status: string;
  url: string;
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

export interface IQueryMaintain {
  status: string;
  data: {
    id: number;
    is_maintained: boolean;
    did_at: string;
    released_at: string;
  };
}

export interface IQueryListRefund {
  status: string;
  data: [
    {
      order_id: string;
      status: string;
      message: string;
      required_refund_at: string;
      customer_stripe_id: string;
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
