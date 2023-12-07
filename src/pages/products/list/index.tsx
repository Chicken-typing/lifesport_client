import Products from '@containers/Products';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { fetchProducts, prefetchProductsQuery } from '@/query/products/get-products';
import { GetServerSideProps } from 'next';
import { API_ENDPOINTS } from '@utils/api-endpoints';

const index = () => <Products />;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const page = Number(params?.page) | 1;
  const limit = Number(params?.limit) | 4;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.PRODUCTS, { page, limit }], fetchProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default index;
