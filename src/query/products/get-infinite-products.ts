import { IProduct } from '@/interfaces/product';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import request from '@/utils/request';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IQueryResultList } from '@/interfaces/app';

interface IPaginateProducts {
  data: IProduct[];
  paginationInfo: {
    nextPage: number;
  };
}

export const fetchProductsInfinite = async ({
  queryKey,
  pageParam,
}: any): Promise<IPaginateProducts> => {
  const [_, { limit }] = queryKey;
  const page = pageParam || 1;

  const { items }: IQueryResultList<IProduct> = await request.request({
    method: 'GET',
    url: API_ENDPOINTS.PRODUCTS,
    params: {
      limit,
      page,
    },
  });

  return {
    data: items,
    paginationInfo: {
      nextPage: page + 1,
    },
  };
};

export const useProductsInfiniteQuery = (options: any) =>
  useInfiniteQuery<IPaginateProducts, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProductsInfinite,
    {
      getNextPageParam: ({ paginationInfo }) => paginationInfo.nextPage,
      retry: 1,
    },
  );
