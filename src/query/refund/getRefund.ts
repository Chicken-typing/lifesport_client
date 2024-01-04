import request from '@/utils/request';
import { IQueryListRefund } from '@interfaces/app';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

export const fetchRefundList = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IQueryListRefund> => {
  const [_, params] = queryKey;

  const data: IQueryListRefund = await request.request({
    method: 'GET',
    url: '/order/admin/refund/list',
  });

  return data;
};

export const useRefundListQuery = (options: any): UseQueryResult<IQueryListRefund, Error> => {
  return useQuery(['fetchRefundList', { ...options }], fetchRefundList, {
    retry: 1,
  });
};

const mutationConfirmRefund = async (data: { order_id: string; confirmed: boolean }) => {
  return await request.request({
    method: 'PUT',
    url: '/order/admin/refund/confirm',
    data: data,
  });
};

export const useConfirmRefundMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: { order_id: string; confirmed: boolean }) => mutationConfirmRefund(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['fetchRefundList']);
      },
    },
  );
};
