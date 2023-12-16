import request from '@/utils/request';
import { IQueryResultInvoices, IUpdate } from '@interfaces/app';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

export type TypeInvoices = 'inbound' | 'outbound' | 'all';

export const fetchInvoices = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IQueryResultInvoices> => {
  const [_, params] = queryKey;
  const type: TypeInvoices = params?.type || 'all';

  const data: IQueryResultInvoices = await request.request({
    method: 'GET',
    url: `/order/admin/list?type=${type}`,
  });

  return data;
};

export const useInvoicesQuery = (options: {
  type?: TypeInvoices;
}): UseQueryResult<IQueryResultInvoices, Error> => {
  return useQuery(['fetchInvoices', { ...options }], fetchInvoices, {
    retry: 1,
  });
};

const mutationUpdateStatus = async (data: IUpdate[]) => {
  return await request.request({
    method: 'PUT',
    url: 'order/admin/deliver',
    data: data,
  });
};

export const useUpdateStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: IUpdate[]) => mutationUpdateStatus(data), {
    // onSuccess: () => {
    //   queryClient.invalidateQueries(['fetchInvoices']);
    // },
  });
};
