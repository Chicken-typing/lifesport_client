import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import request from '@utils/request';
import { fetchProduct } from '../products/get-product';
import { useProductQuery } from '@/query/products/get-product';

const mutatioReviews = async (data: { product_id: string; rate: number; comment?: string }) => {
  return await request.request({
    method: 'POST',
    url: API_ENDPOINTS.REVIEWS,
    data: data,
  });
};

export const useReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { product_id: string; rate: number; comment?: string }) => mutatioReviews(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([API_ENDPOINTS.PRODUCT]);
      },
    },
  );
};
