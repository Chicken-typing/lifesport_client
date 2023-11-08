import { publicRequest } from "../request";

const cartServices = {
  checkValidCart: ({ ids }) => {
    return publicRequest.request({
      method: "POST",
      url: "/products/check",
      data: { ids },
    });
  },
};

export default cartServices;
