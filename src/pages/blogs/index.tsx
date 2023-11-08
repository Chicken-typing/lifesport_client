import Blogs from '@containers/Blogs';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { fetchBlogs } from '@/query/blogs/getBlogs';
import { LIMIT } from '@utils/limit';
import { fetchCategories } from '@/query/blogCategories/getBlogCategories';
const index = () => {
  return <Blogs />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const page = Number(params?.page) || 1;
  const keyword = String(params?.keyword || '');
  const category = String(params?.category || '');

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.BLOGS, { limit: LIMIT.BLOG_LIST, page, keyword, category }],
    fetchBlogs,
    { retry: 1 },
  );

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.PRODUCT_CATEGORIES, { limit: LIMIT.BLOGS_CATEGORY, page: 1 }],
    fetchCategories,
    { retry: 1 },
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default index;
