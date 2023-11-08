import axios from "axios";

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "App-Id": process.env.NEXT_PUBLIC_APP_ID,
  },
};

const handleResponse = (response) => response?.data?.data || response?.data || response;

const handleError = (error) => Promise.reject(error);

let token = null;

export const setToken = (val) => {
  token = val;
};

const privateRequest = axios.create(axiosConfig);
privateRequest.interceptors.request.use((config) => {
  if (!!token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});
privateRequest.interceptors.response.use(handleResponse, handleError);

const publicRequest = axios.create(axiosConfig);
publicRequest.interceptors.response.use(handleResponse, handleError);

export { privateRequest, publicRequest };
