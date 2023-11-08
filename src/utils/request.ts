import axios from 'axios';
import { storeId } from './constants';
import { cookieStorage } from './cookieStorage';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Key': storeId,
  },
  timeout: 30000,
});

request.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject({
      statusCode: error?.response?.status,
      message:
        error?.response?.data?.message || error?.response?.data?.detail || error?.response?.data,
    });
  },
);
request.interceptors.request.use(
  (config) => {
    const token = cookieStorage.getAccessTokenInfo();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
