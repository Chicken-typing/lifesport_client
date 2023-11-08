import { publicRequest } from "../request";

const blogCategoryServices = {
  getBlogCategories: () => {
    return publicRequest.request({
      method: "GET",
      url: "/blog-categories",
    });
  },
};

export default blogCategoryServices;
