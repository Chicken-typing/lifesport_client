import request from '@/utils/request';
import { IQueryResultOrderTemp } from '@interfaces/app';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

export const fetchOrderTemp = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IQueryResultOrderTemp> => {
  const [_, params] = queryKey;

  const data: any = await request.request({
    method: 'GET',
    url: '/order/temp-orders',
  });
  return data;
};

export const useOrderTempQuery = (options: any): UseQueryResult<IQueryResultOrderTemp, Error> => {
  return useQuery(['OrderTemp', { ...options }], fetchOrderTemp, {
    retry: 1,
  });
};
