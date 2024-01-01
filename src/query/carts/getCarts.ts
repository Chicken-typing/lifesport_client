import request from '@/utils/request';
import { IQueryResultCart } from '@interfaces/app';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';

export const fetchCarts = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IQueryResultCart> => {
  const [_, params] = queryKey;
  const products = String(params?.products) || '';
  const data: IQueryResultCart = await request.request({
    method: 'GET',
    url: `/order/products/cart?products=${products}`,
  });
  return data;
};

export const useCartQuery = (options: {
  products: string;
}): UseQueryResult<IQueryResultCart, Error> => {
  return useQuery([`fetchCart`, { ...options }], fetchCarts, {
    retry: 1,
  });
};
