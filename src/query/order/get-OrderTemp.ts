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

export const fetchOrderTemp = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<any> => {
  const [_, params] = queryKey;

  const data: any = await request.request({
    method: 'GET',
    url: '/order/temp-orders',
  });
  return data;
};

export const useOrderTempQuery = (options: any): UseQueryResult<any, Error> => {
  return useQuery(['OrderTemp', { ...options }], fetchOrderTemp, {
    retry: 1,
  });
};
