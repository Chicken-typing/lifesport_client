import { productServices } from '@/kytesoft-client/services';
import { useQuery } from '@tanstack/react-query';

export const getProductQueryConfig = ({ slug, options = {}, ...rest }) => ({
  queryKey: ['/products/list', { slug }],
  queryFn: () => productServices.getProduct({ slug }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useProductQuery = ({ slug, options, ...rest } = {}) => {
  return useQuery(getProductQueryConfig({ slug, options, ...rest }));
};

export const prefetchProductQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getProductQueryConfig(options));
};
