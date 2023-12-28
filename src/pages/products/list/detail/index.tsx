import Product from '@containers/Product';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { GetServerSideProps } from 'next';
import { fetchProduct } from '../../../../query/products/get-product';

const index = () => {
  return <Product />;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const id = Number(context?.query?.id || undefined);

  await queryClient.prefetchQuery([API_ENDPOINTS.PRODUCT, { id }], fetchProduct);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default index;
