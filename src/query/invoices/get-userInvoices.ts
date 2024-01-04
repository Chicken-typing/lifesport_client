import request from '@/utils/request';
import { IQueryResultUserInvoices } from '@interfaces/app';
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
}: QueryFunctionContext<[string, any]>): Promise<IQueryResultUserInvoices> => {
  const [_, params] = queryKey;
  const type: TypeInvoices = params?.type || 'inbound';
  const id: string = params?.id || '';

  const data: IQueryResultUserInvoices = await request.request({
    method: 'GET',
    url: `/order/list/${id}?type=${type}`,
  });

  return data;
};

export const useInvoicesUserQuery = (options: {
  id: string;
  type: TypeInvoices;
}): UseQueryResult<IQueryResultUserInvoices, Error> => {
  return useQuery(['fetchInvoicesUser', { ...options }], fetchInvoices, {
    retry: 1,
  });
};
