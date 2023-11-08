import { useBlogsQuery } from '@/query/blogs/getBlogs';
import { GroupInput } from '@components/compound';
import { Button, KaImage, Link } from '@components/primitive';
import BannerCard from '@containers/Home/BannerCard';
import Skeleton from '@mui/material/Skeleton';
import { LIMIT } from '@utils/limit';
import { routes } from '@utils/routes';
import { format, parseISO } from 'date-fns';
import { map, times } from 'lodash';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState, FC } from 'react';
import { POPULAR_TAGS } from './constants';
import { useBlogCategoriesQuery } from '@/query/blogCategories/getBlogCategories';
import classNames from 'classnames';
import { ISidebarProps } from '@interfaces/sidebar';

const Sidebar: FC<ISidebarProps> = ({ variant }) => {
  const router = useRouter();
  const { query } = router;
  const [searchValue, setSearchValue] = useState<string>();

  const { data: blogs, isFetching: isFetchingBlogs } = useBlogsQuery({
    limit: LIMIT.BLOG_SIDEBAR,
    page: 1,
  });
  const { data: categories, isFetching: isFetchingCategories } = useBlogCategoriesQuery({
    limit: LIMIT.BLOGS_CATEGORY,
    page: 1,
  });

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;

    router.push({
      pathname: routes.BLOGS,
      query: {
        keyword: searchValue,
      },
    });
  };

  useEffect(() => {
    if (!query?.keyword) return;

    setSearchValue(String(query?.keyword));
  }, [query]);

  return (
    <div className={classNames('kl-blogs-sidebar', variant)}>
      <form className="search" onSubmit={handleSearch}>
        <GroupInput
          onChange={({ value }) => setSearchValue(String(value))}
          value={searchValue}
          className="container"
          endAdornment={
            <button>
              <i className="fa-regular fa-magnifying-glass" />
            </button>
          }
          placeholder="Search ..."
          fadePlaceholderShown
        />
      </form>

      <h3 className="title">Recent Posts</h3>
      {isFetchingBlogs ? (
        <ul className="kl-blogs-sidebar-cards">
          {times(LIMIT.BLOG_SIDEBAR, (idx) => (
            <li key={`blog-category-${idx}`} className="item">
              <div className="link">
                <Skeleton animation="wave" variant="rectangular" width={80} height={80} />
                <div className="info">
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="kl-blogs-sidebar-cards">
          {map(blogs?.items, ({ createdAt, thumbnail, name, id }, idx) => (
            <li className="item" key={`recent-post-${idx}`}>
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
                <KaImage className="image" src={thumbnail} alt="card" objectFit="cover" />
                <div className="info">
                  <div className="title">{name}</div>
                  <div className="date">{format(parseISO(createdAt), 'dd/MM/yyyy')}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h3 className="title">Blog Categories</h3>
      {isFetchingCategories && (
        <ul className="kl-blogs-sidebar-categories">
          {times(LIMIT.BLOGS_CATEGORY, (idx) => (
            <li key={`blog-category-${idx}`} className="item">
              <Skeleton animation="wave" />
            </li>
          ))}
        </ul>
      )}
      <ul className="kl-blogs-sidebar-categories">
        {map(categories, ({ id, name }, idx) => (
          <li key={`blog-categories-${idx}`} className="item">
            <Link
              className="link"
              href={{
                pathname: routes.BLOGS,
                query: {
                  category: id,
                },
              }}
              title={name}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <BannerCard
        className="banner"
        action="Mua ngay"
        data={{
          image: 'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog-sidebar.jpg',
          title: 'Green Tea',
          description: 'Rich Natural Taste',
          color: 'black',
        }}
      />

      <h3 className="title">Popular Tags</h3>
      <div className="tags">
        {map(POPULAR_TAGS, (tag, idx) => (
          <Button key={`popular-tag-${idx}`} variant="outlined" color="primary" className="action">
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
