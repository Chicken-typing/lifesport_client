import { publicRequest } from "../request";

const contactServices = {
  createContact: ({ name, phone, email, message }) => {
    return publicRequest.request({
      url: "/contacts",
      data: { name, phone, email, message },
    });
  },
};

export default contactServices;
