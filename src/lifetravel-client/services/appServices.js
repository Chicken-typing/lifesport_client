import { publicRequest } from "../request";

const appServices = {
  getAppSettings: () => {
    return publicRequest.request({
      method: "GET",
      url: "/apps",
    });
  },

  subscribe: ({ email }) => {
    return publicRequest.request({
      method: "POST",
      url: "/subscribes",
      data: { email },
    });
  },
};

export default appServices;
