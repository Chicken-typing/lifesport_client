import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';

const mutationLogin = async (data: { email: string; password: string }) => {
  return await request.request({
    method: 'POST',
    url: API_ENDPOINTS.LOGIN,
    data: data,
  });
};

export const useLoginMutation = () => {
  return useMutation((data: { email: string; password: string }) => mutationLogin(data));
};
