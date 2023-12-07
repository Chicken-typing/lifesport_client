// index.js
import { fetchProducts } from '@/query/products/get-products';
import Product from '@containers/Product';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { GetServerSideProps } from 'next';
import { fetchProduct } from '../../../../query/products/get-product';

const index = () => {
  return <Product />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const id = Number(params?.id);

  // Sử dụng prefetchQuery để tải trước dữ liệu cho trang chi tiết sản phẩm
  await queryClient.prefetchQuery([API_ENDPOINTS.PRODUCT, { id }], fetchProduct);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default index;
