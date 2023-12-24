import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from '@utils/request';

interface PriceData {
  currency: string;
  product_data: {
    name: string;
    description?: string;
    images: string[];
    metadata: {
      color: string;
      product_id: number;
    };
    tax_code: string;
  };
  unit_amount: number;
}

interface LineItem {
  quantity: number;
  price_data: PriceData;
}

interface Product {
  id: number;
  line_item: LineItem;
}

const mutationCheckout = async (data: { email: string; products: Product[] }) => {
  return await request.request({
    method: 'POST',
    url: '/order/checkout',
    data: data,
  });
};

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((data: { email: string; products: Product[] }) => mutationCheckout(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.PRODUCT]);
    },
  });
};
