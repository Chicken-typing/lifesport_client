import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';

const mutationRegister = async (data: { email: string }) => {
  return await request.request({
    method: 'POST',
    url: API_ENDPOINTS.REGISTER,
    data: data,
  });
};

const mutationOTP = async (data: { otp: string; email: string }) => {
  return await request.request({
    method: 'POST',
    url: API_ENDPOINTS.CONFIRM_OTP,
    data: data,
  });
};

const createAccount = async (data: {
  key: string;
  email: string;
  password: string;
  name: string;
}) => {
  return await request.request({
    method: 'POST',
    url: API_ENDPOINTS.CREATE_ACCOUNT,
    data: data,
  });
};

export const useRegisterMutation = () => {
  return useMutation((data: { email: string }) => mutationRegister(data));
};

export const useValidateOtpMutation = () => {
  return useMutation((data: { email: string; otp: string }) => mutationOTP(data));
};

export const useCreateAccountMutation = () => {
  return useMutation((data: { key: string; email: string; password: string; name: string }) =>
    createAccount(data),
  );
};
