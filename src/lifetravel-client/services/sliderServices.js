import { publicRequest } from "../request";

const sliderServices = {
  getSliders: ({ site }) => {
    return publicRequest.request({
      method: "GET",
      url: "/sliders",
      params: { site },
    });
  },
};

export default sliderServices;
