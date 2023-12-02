import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';

const mutatioReviews = async (data: {
  user_id: string;
  product_id: number;
  rate: number;
  comment?: string;
}) => {
  return await request.request({
    method: 'POST',
    url: API_ENDPOINTS.REVIEWS,
    data: data,
  });
};

export const useReviewMutation = () => {
  return useMutation(
    (data: { user_id: string; product_id: number; rate: number; comment?: string }) =>
      mutatioReviews(data),
  );
};
