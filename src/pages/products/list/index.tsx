import Products from '@containers/Products';
import { GetStaticProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { LIMIT } from '@utils/limit';
import { fetchCategories } from '@/query/productCategories/getProductCategories';
import { GetServerSideProps } from 'next';

const index = () => <Products />;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(
//     [API_ENDPOINTS.PRODUCT_CATEGORIES, { limit: LIMIT.PRODUCTS_CATEGORY, page: 1 }],
//     fetchCategories,
//     { retry: 1 },
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 60,
//   };
// };

export default index;
