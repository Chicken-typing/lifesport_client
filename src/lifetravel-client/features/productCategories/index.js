import { productCategoryServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";

export const getProductCategoriesQueryConfig = ({ options = {}, ...rest } = {}) => ({
  queryKey: ["/blog-categories"],
  queryFn: () => productCategoryServices.getProductCategories(),
  options: { retry: 1, ...options },
  ...rest,
});

export const useProductCategoriesQuery = ({ options, ...rest } = {}) => {
  return useQuery(getProductCategoriesQueryConfig({ options, ...rest }));
};

export const prefetchProductCategoriesQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getProductCategoriesQueryConfig(options));
};
