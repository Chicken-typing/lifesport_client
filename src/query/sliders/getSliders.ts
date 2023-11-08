import request from '@/utils/request';
import { IQueryResultList } from '@interfaces/app';
import { ISlider } from '@interfaces/slider';
import { QueryFunctionContext, useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { pickBy } from 'lodash';

export const fetchSliders = async ({
  queryKey,
}: QueryFunctionContext<[string, { page: string }]>): Promise<IQueryResultList<ISlider>> => {
  const [_, params] = queryKey;

  const filterValues = pickBy(params, (value) => !!value || typeof value === 'boolean');

  const data: IQueryResultList<ISlider> = await request.request({
    method: 'GET',
    url: API_ENDPOINTS.SLIDERS,
    params: filterValues,
  });

  return data;
};

export const useSlidersQuery = (options: {
  page: string;
}): UseQueryResult<IQueryResultList<ISlider>, Error> =>
  useQuery([API_ENDPOINTS.SLIDERS, { ...options }], fetchSliders, {
    retry: 1,
  });
