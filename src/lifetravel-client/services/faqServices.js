import { publicRequest } from "../request";

const faqServices = {
  getFaqs: ({ page, limit }) => {
    return publicRequest.request({
      method: "GET",
      url: "/faqs",
      params: { page, limit },
    });
  },
};

export default faqServices;
