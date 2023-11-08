import request from '@/utils/request';
import { IBanner } from '@interfaces/banner';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';

export const fetchBanners = async ({ queryKey }: any): Promise<IBanner[]> => {
  const [_, { page, place }] = queryKey;

  const data: IBanner[] = await request.request({
    method: 'GET',
    url: API_ENDPOINTS.BANNERS,
    params: {
      ...(page ? { page } : { page: 'home' }),
      ...(place ? { place } : { place: 1 }),
    },
  });

  return data;
};

export const useBannersQuery = (options: any): UseQueryResult<IBanner[]> =>
  useQuery([API_ENDPOINTS.BANNERS, options], fetchBanners);
