import KsLayout from '@/layout';
import { useBlogsQuery } from '@/query/blogs/getBlogs';
import { ANCHORS, DRAWERS } from '@/store/drawers/constants';
import { openDrawer } from '@/store/drawers/slice';
import { useAppDispatch } from '@/store/hooks';
import { Pagination } from '@components/compound';
import { Button, KaImage, Link } from '@components/primitive';
import { Skeleton } from '@mui/material';
import { LIMIT } from '@utils/limit';
import { routes } from '@utils/routes';
import { ceil, isEmpty, map, size, times } from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { BLOGS as blogs } from './constants';

export const Blogs = () => {
  const router = useRouter();

  const { query } = router;
  const page = Number(query?.page || 1);
  const keyword = query?.keyword ? String(query.keyword) : undefined;

  const dispatch = useAppDispatch();

  // const { data: blogs, isFetching: isFetchingBlogs } = useBlogsQuery({
  //   limit: LIMIT.BLOG_LIST,
  //   page,
  //   keyword,
  // });

  const breadcrumbs: ReactNode[] = [
    <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
      Home Page
    </Link>,
    <p className="kl-page-header-text" key="shop">
      Blog
    </p>,
  ];

  return (
    <KsLayout
      title="Tin Tức"
      hasPageHeader
      pageHeaderTitle="Blog"
      pageHeaderBackground="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/shop-bc-bg.jpg"
      breadcrumbs={breadcrumbs}
    >
      <div className="kl-blogs kl-container">
        <button
          onClick={() => dispatch(openDrawer({ view: DRAWERS.BLOG, anchor: ANCHORS.left }))}
          className="filter"
        >
          <i className="fa-regular fa-sliders-simple icon" />
          <strong className="text">Filter </strong>
        </button>
        {/* <div className="kl-blogs-layout">
          {isFetchingBlogs ? (
            <div className="content">
              {times(5, (idx) => (
                <div className="blog" key={`blog-${idx}`}>
                  <div className="thumbnail">
                    <div className="skeleton">
                      <Skeleton animation="wave" variant="rectangular" height="100%" />
                    </div>
                    <Skeleton animation="wave" width="40%" />
                    <Skeleton animation="wave" width="60%" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="content">
              {!isEmpty(blogs?.items) &&
                map(blogs?.items, ({ thumbnail, name, tags, description, id, author }) => (
                  <div className="blog" key={`blog-${id}`}>
                    <div className="thumbnail">
                      <Link
                        className="link"
                        href={{
                          pathname: routes.BLOG,
                          query: {
                            slug: id,
                          },
                        }}
                        title={name}
                      >
                        <KaImage
                          src={!isEmpty(thumbnail) ? thumbnail : ''}
                          alt={name}
                          objectFit="cover"
                          className="image"
                          ratio="square"
                        />
                      </Link>
                    </div>

                    <div className="content">
                      <div className="meta">
                        <div className="inner">
                          {size(tags) > 0 && (
                            <div className="kl-blogs-layout-tags">
                              {map(tags, ({ id, name }, idx) => (
                                <span className="text" key={idx}>
                                  {idx > 0 && ', '}
                                  <Link
                                    className="tag"
                                    href={{
                                      pathname: routes.BLOGS,
                                      query: {
                                        tag: id,
                                      },
                                    }}
                                    title={name}
                                    size="xs"
                                    color="primary"
                                  >
                                    {name}
                                  </Link>
                                </span>
                              ))}
                            </div>
                          )}
                          <span className="dash">|</span>
                        </div>
                        <p className="author">
                          Post by <strong className="strong">{author?.username}</strong>
                        </p>
                      </div>
                      <h3 className="text">
                        <Link
                          className="link"
                          href={{
                            pathname: routes.BLOG,
                            query: {
                              slug: id,
                            },
                          }}
                          size="lg"
                          title={name}
                          color="secondary"
                        >
                          {name}
                        </Link>
                      </h3>
                    </div>

                    <p className="description">{description}</p>

                    <Button
                      variant="outlined"
                      endAdornment={<i className="fa-solid fa-chevron-right icon" />}
                      color="primary"
                      className="button"
                      onClick={() =>
                        router.push({
                          pathname: routes.BLOG,
                          query: {
                            slug: id,
                          },
                        })
                      }
                    >
                      Đọc tiếp
                    </Button>
                  </div>
                ))}

              {isEmpty(blogs?.items) && <h3 className="empty">Không tìm thấy kết quả </h3>}
            </div>
          )}

          <div className="sidebar">
            <Sidebar />
          </div>
        </div> */}

        {/* <Pagination
          count={blogs?.total ? ceil(blogs.total / 5) : 0}
          page={page}
          onChange={(p) => {
            router.push(
              {
                query: { ...query, page: p },
              },
              undefined,
              { shallow: true, scroll: true },
            );
          }}
        /> */}
      </div>
    </KsLayout>
  );
};

export default Blogs;
