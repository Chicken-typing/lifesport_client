import { privateRequest, publicRequest } from "../request";

const addressServices = {
  getAddresses: ({ page, limit }) => {
    return privateRequest.request({
      method: "GET",
      url: "/me/addresses",
      params: { page, limit },
    });
  },

  getAddress: ({ id }) => {
    return privateRequest.request({
      method: "GET",
      url: `/me/addresses/${id}`,
    });
  },

  addAddress: ({
    id,
    isEdit,
    address,
    district,
    districtId,
    isDefault,
    name,
    phone,
    province,
    provinceId,
    type,
    ward,
    wardId,
  }) => {
    return privateRequest.request({
      method: isEdit ? "PATCH" : "POST",
      url: isEdit ? `/me/addresses/${id}` : "/me/addresses",
      data: {
        address,
        district,
        districtId,
        isDefault,
        name,
        phone,
        province,
        provinceId,
        type,
        ward,
        wardId,
      },
    });
  },

  deleteAddress: ({ id }) => {
    return privateRequest.request({
      method: "DELETE",
      url: `/me/addresses/${id}`,
    });
  },

  getProvince: () => {
    return publicRequest.request({
      baseURL: process.env.NEXT_PUBLIC_DELIVERY_API_ENDPOINT,
      url: "/address/province",
      method: "GET",
    });
  },

  getDistrict: ({ provinceId }) => {
    return publicRequest.request({
      baseURL: process.env.NEXT_PUBLIC_DELIVERY_API_ENDPOINT,
      url: `/address/district?provinceId=${provinceId}`,
      method: "GET",
    });
  },

  getWard: ({ district }) => {
    return publicRequest.request({
      baseURL: process.env.NEXT_PUBLIC_DELIVERY_API_ENDPOINT,
      url: `/address/ward?districtId=${district}`,
      method: "GET",
    });
  },
};

export default addressServices;
