import request from '@/utils/request';
import { IQueryResultStatistics } from '@interfaces/app';
import { Interval, IStatus } from '@interfaces/statistics';
import { QueryFunctionContext, useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

export const fetchRevenue = async ({
  queryKey,
}: QueryFunctionContext<[string, any]>): Promise<IQueryResultStatistics> => {
  const [_, params] = queryKey;
  const interval: Interval = params?.interval || '';
  const status: IStatus = params?.status || '';
  const data: IQueryResultStatistics = await request.request({
    method: 'GET',
    url: `/statistic/revenue?interval=${interval}&status=${status}`,
  });
  return data;
};

export const useRevenueQuery = (options: {
  interval: Interval;
  status: IStatus;
}): UseQueryResult<IQueryResultStatistics, Error> => {
  const processInterval = (value: Interval): string => String(value).replace(/\"/g, '');
  const processStatus = (value: IStatus): string => String(value).replace(/\"/g, '');

  const processedInterval = processInterval(options.interval);
  const processedStatus = processStatus(options.status);

  return useQuery(
    [`/statistic/revenue?interval=${processedInterval}&status=${processedStatus}`, { ...options }],
    fetchRevenue,
    {
      retry: 1,
    },
  );
};

const mutationSellingRate = async (data: {
  start_date: number;
  end_date: number;
  brands?: string[];
}) => {
  return await request.request({
    method: 'POST',
    url: '/statistic/selling-rate',
    data: data,
  });
};

export const useSellingRateMutation = () => {
  return useMutation((data: { start_date: number; end_date: number; brands?: string[] }) =>
    mutationSellingRate(data),
  );
};
