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

// const mutationUpdateMaintain = async (data: { is_maintained: boolean }) => {
//   return await request.request({
//     method: 'PUT',
//     url: '/system/maintain',
//     data: data,
//   });
// };

// export const useMaintainMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation((data: { is_maintained: boolean }) => mutationUpdateMaintain(data), {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['fetchMaintain']);
//     },
//   });
// };
