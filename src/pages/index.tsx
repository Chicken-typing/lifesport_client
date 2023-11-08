import Home from '@containers/Home';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { LIMIT } from '@utils/limit';
import { fetchProducts } from '@/query/products/get-products';
import { fetchBlogs } from '@/query/blogs/getBlogs';
import { fetchSliders } from '@/query/sliders/getSliders';
import { fetchCategories } from '@/query/blogCategories/getBlogCategories';
import loadNamespaces from 'next-translate/loadNamespaces';

const index = () => <Home />;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery([API_ENDPOINTS.SLIDERS, { page: 'home' }], fetchSliders, {
  //   retry: 1,
  // });

  await queryClient.prefetchQuery([API_ENDPOINTS.PRODUCTS, {}], fetchProducts, {
    retry: 1,
  });

  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.BLOGS, { limit: LIMIT.HOME_BLOGS, page: 1 }],
  //   fetchBlogs,
  //   {
  //     retry: 1,
  //   },
  // );

  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.PRODUCT_CATEGORIES, { limit: LIMIT.HOME_COLLECTIONS, page: 1 }],
  //   fetchCategories,
  //   {
  //     retry: 1,
  //   },
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default index;
