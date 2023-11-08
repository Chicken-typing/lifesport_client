import { blogServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";

export const getBlogQueryConfig = ({ slug, options = {}, ...rest } = {}) => ({
  queryKey: ["/blogs", { slug }],
  queryFn: () => blogServices.getBlog({ slug }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useBlogQuery = ({ slug, options, ...rest } = {}) => {
  return useQuery(getBlogQueryConfig({ slug, options, ...rest }));
};

export const prefetchBlogQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getBlogQueryConfig(options));
};
