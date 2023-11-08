import { API_ENDPOINTS } from '@/utils/api-endpoints';
import request from '@/utils/request';
import { IQueryOptionsList, IQueryResultList } from '@interfaces/app';
import { IBlog } from '@interfaces/blog';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';
import { pickBy } from 'lodash';

export const fetchBlogs = async ({
  queryKey,
}: QueryFunctionContext<
  [string, IQueryOptionsList & { keyword?: string; category?: string }]
>): Promise<IQueryResultList<IBlog>> => {
  const [_, params] = queryKey;

  const filterValues = pickBy(params, (value) => !!value || typeof value === 'boolean');

  const data: IQueryResultList<IBlog> = await request.request({
    method: 'GET',
    url: API_ENDPOINTS.BLOGS,
    params: filterValues,
  });

  return data;
};

export const useBlogsQuery = (
  options: IQueryOptionsList & { keyword?: string; category?: string },
): UseQueryResult<IQueryResultList<IBlog>, Error> =>
  useQuery([API_ENDPOINTS.BLOGS, { ...options }], fetchBlogs);
