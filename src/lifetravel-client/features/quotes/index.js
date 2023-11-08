import { quoteServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../constants";

export const getQuotesQueryConfig = ({
  page = 1,
  limit = PAGE_SIZE,
  options = {},
  ...rest
} = {}) => ({
  queryKey: ["/quotes", { page, limit }],
  queryFn: () => quoteServices.getQuotes({ page, limit }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useQuotesQuery = ({ page, limit, options, ...rest } = {}) => {
  return useQuery(getQuotesQueryConfig({ page, limit, options, ...rest }));
};

export const prefetchQuotesQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getQuotesQueryConfig(options));
};
