import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import request from '@utils/request';

const subscribe = async (body: string) => {
  const response = await request.request({
    method: 'POST',
    url: API_ENDPOINTS.SUBSCRIBE,
    data: {
      email: body,
    },
  });
  return response;
};

export const useSubscribeMutation = () => useMutation([API_ENDPOINTS.SUBSCRIBE], subscribe);
