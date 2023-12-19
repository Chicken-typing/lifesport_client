import KsLayout from '@/layout';
import { useProductsQuery } from '@/query/products/get-products';
import { Pagination, ProductCard } from '@components/compound';
import ProductSidebarDrawer from '@components/compound/Drawer/ProductSidebarDrawer';
import { Link } from '@components/primitive';
import BannerCard from '@containers/Home/BannerCard';
import { LIMIT } from '@utils/limit';
import { routes } from '@utils/routes';
import { ceil, isEmpty, map, size, times } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { IHomeBanner } from '../Home/constants';
import Sidebar from './Sidebar';

const Products = () => {
  const router = useRouter();
  const { query } = router;

  const page = Number(query?.page || 1);

  const limit = Number(query?.limit || LIMIT.PRODUCTS_FILTER);
  const brand = String(query?.brand || undefined);
  const s = String(query.s) || undefined;
  const min = Number(query?.min || 75000);
  const max = Number(query?.max || 900000);

  const START = limit * (page - 1);
  const END = limit * page;

  const {
    data: products,
    isFetching: isLoading,
    isError,
  } = useProductsQuery({ brand, s, r: `${min},${max}` });
  const { t } = useTranslation('products');
  const [open, setOpen] = useState<boolean>(false);

  const breadcrumbs: ReactNode[] = [
    <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
      {t('breadcrumbs.first_route')}
    </Link>,
    <p className="kl-page-header-text" key="shop">
      {t('breadcrumbs.second_route')}
    </p>,
  ];

  const banner: IHomeBanner = {
    image: t('banner.image'),
    title: t('banner.title'),
    description: t('banner.description'),
    color: t('banner.color'),
  };

  return (
    <KsLayout
      title={t('title')}
      hasPageHeader
      pageHeaderTitle={t('header')}
      pageHeaderBackground="https://cdn.newswire.com/files/x/f7/68/4ab9c44ee75da3217d026a3c56d9.png"
      breadcrumbs={breadcrumbs}
      colorTitle={'white'}
      breadcrumbsColor="white"
    >
      <div className="kl-products">
        <div className="kl-container content">
          <div className="row wrapper">
            <div className="col-12 col-xl-2">
              <Sidebar variant="-static" />
            </div>

            <div className="col-12 col-xl-10">
              <section className="kl-products-banners">
                <div className="kl-container content">
                  <p className="description">{t('slogan')}</p>
                  <div className="wrapper">
                    <BannerCard data={banner} action={t('action')} size="medium" />
                  </div>
                </div>
              </section>

              <section className="kl-products-filters">
                <div className="kl-container content">
                  <div className="sorts">
                    {/* <div className="actions">
                      <button onClick={() => setOpen(true)} className="filter">
                        <i className="fa-regular fa-sliders-simple icon" />
                        <strong className="text">Filter</strong>
                      </button>
                      <div className="sort">
                        <FormControl>
                          <Select
                            value={sort}
                            onChange={(e) =>
                              router.push({
                                query: {
                                  ...query,
                                  sort: e.target.value,
                                },
                              })
                            }
                            input={<Input disableUnderline className="select-input" />}
                          >
                            {map(SORT_ITEMS, (it, idx) => (
                              <MenuItem value={it.value} key={`soft-item-${idx}`}>
                                {it.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      <div className="show">
                        <span className="text">Show</span>
                        <FormControl>
                          <Select
                            value={limit}
                            onChange={(e) =>
                              router.push({
                                query: {
                                  ...query,
                                  limit: e.target.value,
                                },
                              })
                            }
                            input={<Input disableUnderline className="select-input" />}
                          >
                            {map(SHOW_ITEMS, (it, idx) => (
                              <MenuItem
                                className="kl-products-menu-item"
                                value={it.value}
                                key={`show-item-${idx}`}
                              >
                                {it.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div> */}

                    <div className="info">
                      <p className="text">Showing {size(products?.items) || 0} results</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* <section className="kl-products-result-filter">
                <div className="kl-container content">
                  <div className="row wrapper">
                    {isEmpty(products?.items) ? (
                      <div className="col-12 empty-result">Empty Result</div>
                    ) : (
                      map(products?.items?.slice(START, END), (item, idx) => (
                        <div
                          className="col-12 col-md-4 col-lg-4 item"
                          key={`product-result-${idx}`}
                        >
                          <ProductCard data={item} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section> */}

              <section className="kl-products-result-filter">
                <div className="kl-container content">
                  <ul className="row wrapper">
                    {!isLoading && !isError && isEmpty(products?.items) && (
                      <li className="col-12 empty-result">Không có sản phẩm</li>
                    )}

                    {!isLoading && !isError
                      ? map(products?.items?.slice(START, END), (item, idx) => (
                          <li
                            className="col-12 col-md-4 col-lg-4 item"
                            key={`product-result-${idx}`}
                          >
                            <ProductCard data={item} />
                          </li>
                        ))
                      : times(limit, (idx) => (
                          <li
                            className="col-12 col-md-4 col-lg-4 item"
                            key={`product-result-${idx}`}
                          >
                            <ProductCard isLoading />
                          </li>
                        ))}
                  </ul>
                </div>
              </section>

              <Pagination
                count={ceil((size(products?.items) || 0) / limit)}
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
              />
            </div>
          </div>
        </div>
      </div>

      <ProductSidebarDrawer open={open} onClose={() => setOpen(false)} variant="-drawer" />
    </KsLayout>
  );
};

export default Products;
