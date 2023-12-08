import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';

const mutationApplyEvent = async (data: { code: string }) => {
  return await request.request({
    method: 'PUT',
    url: '/products/admin/apply_event',
    data: data,
  });
};

export const useEventMutation = () => {
  return useMutation((data: { code: string }) => mutationApplyEvent(data));
};
