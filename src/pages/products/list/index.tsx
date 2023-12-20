import Products from '@containers/Products';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { fetchProducts } from '@/query/products/get-products';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { GetServerSideProps } from 'next';

const index = () => <Products />;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const brand = String(context?.query?.brand || undefined);
  const s = String(context.query?.s || undefined);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.PRODUCTS, { brand, s }], fetchProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default index;
