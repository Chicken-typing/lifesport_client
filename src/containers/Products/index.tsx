import KsLayout from '@/layout';
import { useProductsQuery } from '@/query/products/get-products';
import { ANCHORS, DRAWERS } from '@/store/drawers/constants';
import { openDrawer } from '@/store/drawers/slice';
import { useAppDispatch } from '@/store/hooks';
import { Pagination, ProductCard } from '@components/compound';
import { Link } from '@components/primitive';
import BannerCard from '@containers/Home/BannerCard';
import { FormControl, Input, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { LIMIT } from '@utils/limit';
import { routes } from '@utils/routes';
import { ceil, isEmpty, map, size, times } from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { PRODUCT_BANNER, SHOW_ITEMS, SORT_ITEMS } from './constants';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

const Products = () => {
  const router = useRouter();
  const { query } = router;

  const page = Number(query?.page || 1);
  const sort = String(query?.sort || SORT_ITEMS[0].value);
  const limit = Number(query?.limit || LIMIT.PRODUCTS_FILTER);
  // const category = String(query?.category || undefined);
  // const name = String(query?.name || undefined);
  const dispatch = useAppDispatch();
  const START = limit * (page - 1);
  const END = limit * page;

  const { data: products, isFetching: isLoading, isError } = useProductsQuery({ page: 1 });
  const { t } = useTranslation('products');

  const breadcrumbs: ReactNode[] = [
    <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
      {t('breadcrumbs.first_route')}
    </Link>,
    <p className="kl-page-header-text" key="shop">
      {t('breadcrumbs.second_route')}
    </p>,
  ];

  return (
    <KsLayout
      title="Danh sách sản phẩm"
      hasPageHeader
      pageHeaderTitle="Product"
      pageHeaderBackground="https://can-am.brp.com/content/can-am-on-road/en_nz/models/can-am-electric-motorcycles/_jcr_content/root/imagecards.coreimg.jpeg/1678821073125/pulse.jpeg?imwidth=2048"
      breadcrumbs={breadcrumbs}
      colorTitle={'white'}
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
                  <p className="description">
                    Choose from over 75 tea blends – from the classic Earl Grey to the award-winning
                    Blueberry Merlot – our whole leaf teas are available in a variety of package
                    types. We hope our teas provide you with some well-deserved comfort during your
                    day.
                  </p>
                  <div className="wrapper">
                    <BannerCard data={PRODUCT_BANNER} action="Sản phẩm bán chạy" size="medium" />
                  </div>
                </div>
              </section>

              <section className="kl-products-filters">
                <div className="kl-container content">
                  <div className="sorts">
                    <div className="actions">
                      <button
                        onClick={() =>
                          dispatch(openDrawer({ view: DRAWERS.PRODUCT, anchor: ANCHORS.left }))
                        }
                        className="filter"
                      >
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
                    </div>

                    <div className="info">
                      <p className="text">
                        Showing 1–{limit || LIMIT.PRODUCTS_FILTER} of {size(products?.items) || 0}{' '}
                        results
                      </p>
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
    </KsLayout>
  );
};

export default Products;
