import { publicRequest } from "../request";

const quoteServices = {
  getQuotes: ({ page, limit }) => {
    return publicRequest.request({
      method: "GET",
      url: "/quotes",
      params: { page, limit },
    });
  },
};

export default quoteServices;
