import { useAuth } from "@/kytesoft-client/auth";
import { faqServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../constants";

export const getAddressesQueryConfig = ({
  page = 1,
  limit = PAGE_SIZE,
  options = {},
  ...rest
} = {}) => ({
  queryKey: ["/addresses", { page, limit }],
  queryFn: () => faqServices.getFaqs({ page, limit }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useAddressesQuery = ({ page, limit, options, ...rest } = {}) => {
  const { isAuthenticated } = useAuth();

  return useQuery(
    getAddressesQueryConfig({ page, limit, options, enabled: isAuthenticated, ...rest })
  );
};

export const prefetchAddressesQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getAddressesQueryConfig(options));
};
