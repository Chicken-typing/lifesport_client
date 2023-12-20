import { fetchProducts } from '@/query/products/get-products';
import Home from '@containers/Home';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { GetStaticProps } from 'next';

const index = () => <Home />;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.PRODUCTS, {}], fetchProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default index;
