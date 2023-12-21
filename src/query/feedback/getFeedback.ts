import request from '@/utils/request';
import { IQueryResultOrderTemp } from '@interfaces/app';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

export interface IFeedback {
  status: string;
  data: [
    {
      id: number;

      name: string;
      description: string;
      created_at: string;
    },
  ];
}

export const fetchFeedback = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IFeedback> => {
  const [_, params] = queryKey;

  const data: IFeedback = await request.request({
    method: 'GET',
    url: '/feedback',
  });
  return data;
};

export const useFeedback = (options: any): UseQueryResult<IFeedback, Error> => {
  return useQuery(['Feedback', { ...options }], fetchFeedback, {
    retry: 1,
  });
};
