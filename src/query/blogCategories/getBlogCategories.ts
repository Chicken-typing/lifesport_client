import request from '@/utils/request';
import { IQueryOptionsList, IQueryResultList } from '@interfaces/app';
import { ICategory } from '@interfaces/category';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';

export const fetchCategories = async ({
  queryKey,
}: QueryFunctionContext<[string, IQueryOptionsList]>): Promise<IQueryResultList<ICategory>> => {
  const [_, { limit, page }] = queryKey;

  const data: IQueryResultList<ICategory> = await request.request({
    method: 'GET',
    url: API_ENDPOINTS.PRODUCT_CATEGORIES,
    params: {
      limit,
      page,
    },
  });

  return data;
};

export const useBlogCategoriesQuery = (
  options: IQueryOptionsList,
): UseQueryResult<ICategory[], Error> =>
  useQuery([API_ENDPOINTS.PRODUCT_CATEGORIES, options], fetchCategories, {
    retry: 1,
  });
