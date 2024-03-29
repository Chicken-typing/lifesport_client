import { API_ENDPOINTS } from '@/utils/api-endpoints';
import request from '@/utils/request';
import { IQueryOptionsList, IQueryResultList } from '@interfaces/app';
import { IProduct } from '@interfaces/product';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';
import { pickBy } from 'lodash';

export const fetchProducts = async ({
  queryKey,
}: QueryFunctionContext<
  [string, IQueryOptionsList & { s?: string; brand?: string; rating?: number; r?: string }]
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
  options?: IQueryOptionsList & {
    s?: string;
    brand?: string;
    rating?: number;
    r?: string;
  },
): UseQueryResult<IQueryResultList<IProduct>, Error> =>
  useQuery([API_ENDPOINTS.PRODUCTS, { ...options }], fetchProducts, {
    retry: 1,
  });

export const fetchProductAdmin = async ({
  queryKey,
}: QueryFunctionContext<
  [string, IQueryOptionsList & { s?: string; brand?: string; rating?: number }]
>): Promise<IQueryResultList<IProduct>> => {
  const [_, params] = queryKey;
  const filterValues = pickBy(params, (value) => value !== 'undefined');

  const data: IQueryResultList<IProduct> = await request.request({
    method: 'GET',
    url: '/products/admin/list',
    params: filterValues,
  });

  return data;
};

export const useProductAdminQuery = (
  options?: IQueryOptionsList & { s?: string; brand?: string; rating?: number },
): UseQueryResult<IQueryResultList<IProduct>, Error> =>
  useQuery([API_ENDPOINTS.PRODUCTS, { ...options }], fetchProductAdmin, {
    retry: 1,
  });

export const prefetchProductsQuery = async (queryClient: any, options?: any) => {
  await queryClient.prefetchQuery(fetchProducts(options));
};
