import request from '@/utils/request';
import { IProduct } from '@interfaces/product';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { IQueryResultDetail } from '@interfaces/app';

export const fetchProduct = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IQueryResultDetail<IProduct>> => {
  const [_, params] = queryKey;
  const id = params?.id || '';

  const data: IQueryResultDetail<IProduct> = await request.request({
    method: 'GET',
    url: API_ENDPOINTS.PRODUCT,
    params: { id },
  });
  return data;
};

export const useProductQuery = (
  options: any,
): UseQueryResult<IQueryResultDetail<IProduct>, Error> =>
  useQuery([API_ENDPOINTS.PRODUCT, { ...options }], fetchProduct, {
    retry: 1,
  });
