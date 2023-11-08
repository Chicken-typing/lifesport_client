import request from '@/utils/request';
import { IDetailBlog } from '@interfaces/blog';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';

export const fetchBlog = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<IDetailBlog> => {
  const [_, slug] = queryKey;

  const data: IDetailBlog = await request.request({
    method: 'GET',
    url: `${API_ENDPOINTS.BLOG}/${slug}`,
  });

  return data;
};

export const useBlogQuery = (slug: string): UseQueryResult<IDetailBlog, Error> =>
  useQuery([API_ENDPOINTS.BLOG, slug], fetchBlog, {
    retry: 1,
  });
