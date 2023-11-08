import { faqServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../constants";

export const getFaqsQueryConfig = ({
  page = 1,
  limit = PAGE_SIZE,
  options = {},
  ...rest
} = {}) => ({
  queryKey: ["/faqs", { page, limit }],
  queryFn: () => faqServices.getFaqs({ page, limit }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useFaqsQuery = ({ page, limit, options, ...rest } = {}) => {
  return useQuery(getFaqsQueryConfig({ page, limit, options, ...rest }));
};

export const prefetchFaqsQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getFaqsQueryConfig(options));
};
