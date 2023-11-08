import { productServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";
import { pickBy, trim } from "lodash";
import { PAGE_SIZE } from "../constants";

export const getProductsQueryConfig = ({
  page = 1,
  limit = PAGE_SIZE,
  keyword,
  isPopular,
  isBestSelling,
  categoryId,
  options = {},
  ...rest
} = {}) => {
  const params = {
    page,
    limit,
    q: trim(keyword),
    isPopular,
    isBestSelling,
    categoryId,
  };
  const originalParams = pickBy(params, (val) => !!val);

  return {
    queryKey: ["/products", originalParams],
    queryFn: () => productServices.getProducts(originalParams),
    options: { retry: 1, ...options },
    ...rest,
  };
};

export const useProductsQuery = ({
  page,
  limit,
  keyword,
  isPopular,
  isBestSelling,
  categoryId,
  options,
  ...rest
} = {}) => {
  return useQuery(
    getProductsQueryConfig({
      page,
      limit,
      keyword,
      isPopular,
      isBestSelling,
      categoryId,
      options,
      ...rest,
    })
  );
};

export const prefetchProductsQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getProductsQueryConfig(options));
};
