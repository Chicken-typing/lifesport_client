import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';

const mutationRefund = async (data: { order_id: string; message: string }) => {
  return await request.request({
    method: 'POST',
    url: '/order/refund/require',
    data: data,
  });
};

export const useRefundMutation = () => {
  return useMutation((data: { order_id: string; message: string }) => mutationRefund(data));
};
