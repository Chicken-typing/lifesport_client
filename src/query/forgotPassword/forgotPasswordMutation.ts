import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';

const mutationEmail = async (data: { email: string }) => {
  return await request.request({
    method: 'POST',
    url: '/users/forgot-password',
    data: data,
  });
};

const mutationOTP = async (data: { otp: string; email: string }) => {
  return await request.request({
    method: 'POST',
    url: '/users/forgot-password/confirm',
    data: data,
  });
};

const ResetPassword = async (data: { key: string; email: string; password: string }) => {
  return await request.request({
    method: 'POST',
    url: '/users/forgot-password/update',
    data: data,
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation((data: { email: string }) => mutationEmail(data));
};

export const useValidateOtpMutation = () => {
  return useMutation((data: { email: string; otp: string }) => mutationOTP(data));
};

export const useResetPasswordMutation = () => {
  return useMutation((data: { key: string; password: string; email: string }) =>
    ResetPassword(data),
  );
};
