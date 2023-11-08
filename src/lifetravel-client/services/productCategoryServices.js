import { publicRequest } from "../request";

const productCategoryServices = {
  getProductCategories: () => {
    return publicRequest.request({
      method: "GET",
      url: "/product-categories",
    });
  },
};

export default productCategoryServices;
