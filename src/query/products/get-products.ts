import { API_ENDPOINTS } from '@/utils/api-endpoints';
import request from '@/utils/request';
import { IQueryOptionsList, IQueryResultList } from '@interfaces/app';
import { IProduct } from '@interfaces/product';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';
import { pickBy } from 'lodash';

export const fetchProducts = async ({
  queryKey,
}: QueryFunctionContext<
  [string, IQueryOptionsList & { name?: string; filter_brand?: string; rating?: number }]
>): Promise<IQueryResultList<IProduct>> => {
  const [_, params] = queryKey;
  const filterValues = pickBy(params, (value) => value !== 'undefined');

  const data: IQueryResultList<IProduct> = await request.request({
    method: 'GET',
    url: API_ENDPOINTS.PRODUCTS,
    params: filterValues,
  });

  return data;
};

export const useProductsQuery = (
  options?: IQueryOptionsList & { name?: string; filter_brand?: string; rating?: number },
): UseQueryResult<IQueryResultList<IProduct>, Error> =>
  useQuery([API_ENDPOINTS.PRODUCTS, { ...options }], fetchProducts, {
    retry: 1,
  });
