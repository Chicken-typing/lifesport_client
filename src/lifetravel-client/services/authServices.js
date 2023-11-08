import { privateRequest, publicRequest } from "../request";

const authServices = {
  login: async ({ username, password }) => {
    return publicRequest.request({
      method: "POST",
      url: "/login",
      data: { username, password },
    });
  },

  refreshToken: ({ token }) => {
    return publicRequest.request({
      method: "POST",
      url: "/refresh-token",
      data: { token },
    });
  },

  getMe: () => {
    return privateRequest.request({
      method: "GET",
      url: "/me",
    });
  },

  logout: () => {
    return privateRequest.request({
      method: "POST",
      url: "/logout",
    });
  },

  clientGetToken: () => {
    return publicRequest.request({
      method: "GET",
      baseURL: process.env.NEXT_PUBLIC_SITE_URL,
      url: "/api/token",
    });
  },

  clientGetMe: () => {
    return publicRequest.request({
      method: "GET",
      baseURL: process.env.NEXT_PUBLIC_SITE_URL,
      url: "/api/user",
    });
  },

  clientLogin: ({ username, password }) => {
    return publicRequest.request({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_SITE_URL,
      url: "/api/login",
      data: { username, password },
    });
  },

  clientLogout: () => {
    return publicRequest.request({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_SITE_URL,
      url: "/api/logout",
    });
  },

  clientRegister: (data) => {
    return publicRequest.request({
      method: "POST",
      url: "/register/basic",
      data,
    });
  },

  clientRegisterResendOtp: ({ token }) => {
    return publicRequest.request({
      method: "POST",
      url: "/register/basic/resend-otp",
      data: { token },
    });
  },

  clientRegisterVerify: ({ token, code }) => {
    return publicRequest.request({
      method: "POST",
      url: "/register/basic/verify",
      data: { token, code },
    });
  },

  forgetPassword: ({ username }) => {
    return publicRequest.request({
      method: "POST",
      url: "/forget-password",
      data: { username },
    });
  },

  forgetPasswordResendOtp: ({ token }) => {
    return publicRequest.request({
      method: "POST",
      url: "/forget-password/resend-otp",
      data: { token },
    });
  },

  forgetPasswordVerify: ({ token, code }) => {
    return publicRequest.request({
      method: "POST",
      url: "/forget-password/verify",
      data: { token, code },
    });
  },

  resetPassword: ({ password, confirmPassword, token, code }) => {
    return publicRequest.request({
      method: "POST",
      url: "/forget-password/verify",
      data: { password, confirmPassword, token, code },
    });
  },
};

export default authServices;
