import request from '@/utils/request';
import { IQueryMaintain } from '@interfaces/app';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

export const fetchMaintain = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IQueryMaintain> => {
  const [_, params] = queryKey;

  const data: IQueryMaintain = await request.request({
    method: 'GET',
    url: '/system/maintain',
  });

  return data;
};

export const useMaintainQuery = (options: any): UseQueryResult<IQueryMaintain, Error> => {
  return useQuery(['fetchMaintain', { ...options }], fetchMaintain, {
    retry: 1,
  });
};

const mutationUpdateMaintain = async (data: { is_maintained: boolean }) => {
  return await request.request({
    method: 'PUT',
    url: '/system/maintain',
    data: data,
  });
};

export const useMaintainMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: { is_maintained: boolean }) => mutationUpdateMaintain(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchMaintain']);
    },
  });
};
