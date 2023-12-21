import request from '@/utils/request';
import { IQueryResultOrderTemp } from '@interfaces/app';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

export interface ICoupons {
  status: string;
  data: [
    {
      code: string;
      percent_off: number;
      amount_off: number;
      first_time_transaction: boolean;
      times_redeemed: number;
      max_redemptions: number;
    },
  ];
}

export const fetchCoupons = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<ICoupons> => {
  const [_, params] = queryKey;

  const data: ICoupons = await request.request({
    method: 'GET',
    url: '/feedback',
  });
  return data;
};

export const useCouponsQuery = (options: any): UseQueryResult<ICoupons, Error> => {
  return useQuery(['Feedback', { ...options }], fetchCoupons, {
    retry: 1,
  });
};
