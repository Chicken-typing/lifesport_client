import { sliderServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";

export const getSlidersQueryConfig = ({ site, options = {}, ...rest } = {}) => ({
  queryKey: ["/sliders", { site }],
  queryFn: () => sliderServices.getSliders({ site }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useSlidersQuery = ({ site, options, ...rest } = {}) => {
  return useQuery(getSlidersQueryConfig({ site, options, ...rest }));
};

export const prefetchSlidersQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getSlidersQueryConfig(options));
};
