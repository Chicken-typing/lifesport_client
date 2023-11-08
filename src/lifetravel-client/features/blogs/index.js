import { blogServices } from "@/kytesoft-client/services";
import { useQuery } from "@tanstack/react-query";
import { pickBy, trim } from "lodash";
import { PAGE_SIZE } from "../constants";

export const getBlogsQueryConfig = ({
  page = 1,
  limit = PAGE_SIZE,
  keyword,
  categoryId,
  options = {},
  ...rest
} = {}) => {
  const params = {
    page,
    limit,
    q: trim(keyword),
    categoryId,
  };
  const originalParams = pickBy(params, (val) => !!val);

  return {
    queryKey: ["/blogs", originalParams],
    queryFn: () => blogServices.getBlogs(originalParams),
    options: { retry: 1, ...options },
    ...rest,
  };
};

export const useBlogsQuery = ({
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
    getBlogsQueryConfig({
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

export const prefetchBlogsQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getBlogsQueryConfig(options));
};
