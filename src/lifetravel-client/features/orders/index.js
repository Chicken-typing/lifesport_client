import { orderServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../constants";

const geOrdersQueryConfig = ({
  page = 1,
  limit = PAGE_SIZE,
  status,
  options = {},
  ...rest
} = {}) => ({
  queryKey: ["/orders", { page, limit, ...(status && { status }) }],
  queryFn: () => orderServices.getOrders({ page, limit, status }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useOrdersQuery = ({ page, limit, status, options, ...rest } = {}) => {
  return useQuery(geOrdersQueryConfig({ page, limit, status, options, ...rest }));
};

export const prefetchOrdersQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(geOrdersQueryConfig(options));
};
