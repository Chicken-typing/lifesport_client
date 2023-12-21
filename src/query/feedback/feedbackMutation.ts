import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';

const mutationFeedback = async (data: { email: string; name: string; description: string }) => {
  return await request.request({
    method: 'POST',
    url: '/feedback',
    data: data,
  });
};

export const useFeedbackMutation = () => {
  return useMutation((data: { email: string; name: string; description: string }) =>
    mutationFeedback(data),
  );
};
