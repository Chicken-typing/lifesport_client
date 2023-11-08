import { appServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";

export const getAppSettingsQueryConfig = ({ options = {}, ...rest } = {}) => ({
  queryKey: ["/apps"],
  queryFn: () => appServices.getAppSettings(),
  options: { retry: 1, ...options },
  ...rest,
});

export const useAppSettingsQuery = ({ options, ...rest } = {}) => {
  return useQuery(getAppSettingsQueryConfig({ options, ...rest }));
};

export const prefetchAppSettingsQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getAppSettingsQueryConfig(options));
};
