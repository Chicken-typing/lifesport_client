import { privateRequest } from "../request";

const orderServices = {
  getOrders: ({ page, limit, status }) => {
    return privateRequest.request({
      method: "GET",
      url: "/me/orders",
      params: { page, limit, ...(status && { status }) },
    });
  },

  getOrder: ({ id }) => {
    return privateRequest.request({
      method: "GET",
      url: `/me/orders/${id}`,
    });
  },

  cancelOrder: ({ id }) => {
    return privateRequest.request({
      method: "POST",
      url: `/me/orders/${id}/cancel`,
    });
  },
};

export default orderServices;
