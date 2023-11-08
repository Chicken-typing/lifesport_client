import { publicRequest } from "../request";

const productServices = {
  getProducts: (params) => {
    return publicRequest.request({
      method: "GET",
      url: "/products",
      params,
    });
  },

  getProduct: ({ slug }) => {
    return publicRequest.request({
      method: "GET",
      url: `/products/${slug}`,
    });
  },
};

export default productServices;
