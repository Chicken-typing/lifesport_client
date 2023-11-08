import { publicRequest } from "../request";

const blogServices = {
  getBlogs: (params) => {
    return publicRequest.request({
      method: "GET",
      url: "/blogs",
      params,
    });
  },

  getBlog: ({ slug }) => {
    return publicRequest.request({
      method: "GET",
      url: `/blogs/${slug}`,
    });
  },
};

export default blogServices;
