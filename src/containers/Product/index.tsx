import KsLayout from '@/layout';
import { useProductQuery } from '@/query/products/get-product';
import { useProductsQuery } from '@/query/products/get-products';

import { useAppDispatch } from '@/store/hooks';
import { MODALS } from '@/store/modals/constants';
import { openModal } from '@/store/modals/slice';
import { CommentCard, ProductSlides, Rating } from '@components/compound';
import { Badge, Button, KaImage, Label, Link } from '@components/primitive';
import CommentForm from '@containers/Blog/CommentForm';
import Skeleton from '@mui/material/Skeleton';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { routes } from '@utils/routes';
import classNames from 'classnames';
import { flatMapDepth, get, isEmpty, map, size } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AccordionTab from './AccordionTab';
import { SHARE } from './constants';
import { addCart, incrementCart, decrementCart } from '@/store/cartUser/slice';

const Product = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState('');

  const router = useRouter();
  const { query } = router;
  const id = Number(query?.id) || 0;
  const dispatch = useAppDispatch();

  const { t } = useTranslation('detail');

  const token = cookieStorage?.getAccessTokenInfo();
  const decoded = decodeToken(token || '');
  const role = decoded?.role;

  const {
    data: product,
    isError: isErrorProductDetail,
    isLoading: isLoadingProductDetail,
  } = useProductQuery({ id });

  const { data: products } = useProductsQuery({});

  const breadcrumbs: ReactNode[] = [
    <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
      {t('breadcrumb.first')}
    </Link>,
    <Link href={routes.PRODUCTS} title="homepage" key="blogs" className="kl-page-header-link">
      {t('breadcrumb.second')}
    </Link>,
    <p className="kl-page-header-text" key="blog">
      {t('breadcrumb.third')}
    </p>,
  ];

  const recommend = products?.items.filter(
    (item) =>
      item?.brand === get(product?.item, '[0].brand', '') &&
      item?.id !== get(product?.item, '[0].id', 0),
  );

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    }
  };
  const handlePlus = () => {
    const currenQuantity = get(product?.item, '[0].quantity', 0);
    setQuantity(quantity < currenQuantity ? quantity + 1 : currenQuantity);
  };

  // const handleBlurQuantity = (e: FocusEvent<HTMLInputElement>) => {
  //   const value = Number(e.target.value || 0);
  //   const currenQuantity = product?.item[0]?.quantity || 0;

  //   if (value > currenQuantity) {
  //     setQuantity(currenQuantity);
  //   }
  //   if (!value || value <= 0) return setQuantity(1);
  // };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    if (!get(product?.item, '[0].color[0]', '')) {
      return;
    }
    setSelectedValue(get(product?.item, '[0].color[0]', ''));
  }, [product]);

  return (
    <KsLayout title="Sản phẩm" hasPageHeader breadcrumbs={breadcrumbs}>
      <div className="kl-product kl-container">
        <div className="kl-product-information">
          <div className="wrapper row">
            <div className="left col-12 col-md-6">
              {isLoadingProductDetail || isErrorProductDetail ? (
                <div className="overlay">
                  <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
                </div>
              ) : (
                map(flatMapDepth(map(product?.item, (item) => item?.images)), (image, idx) => (
                  <KaImage
                    className="image"
                    src={image || ''}
                    alt={image || ''}
                    objectFit="contain"
                    key={`product-image-${idx}`}
                    onClick={() => {
                      dispatch(
                        openModal({
                          view: MODALS.LIGHT_BOX,
                          lightBoxData: {
                            defaultActive: idx,
                            images: flatMapDepth(map(product?.item, (item) => item?.images)),
                          },
                        }),
                      );
                    }}
                  />
                ))
              )}
            </div>

            {!isLoadingProductDetail && !isErrorProductDetail && (
              <div className="right col-12 col-md-6">
                <div className="content">
                  <div className="header">
                    <div className="group">
                      {map(
                        flatMapDepth(
                          map(product?.item, (item, idx) =>
                            item?.percent_off ? (
                              <Badge
                                key={idx}
                                className="badge"
                                label={`${t('status.first')} ${item?.percent_off}% `}
                                color="danger"
                              />
                            ) : (
                              <div key={idx}></div>
                            ),
                          ),
                        ),
                      )}

                      {map(
                        flatMapDepth(
                          map(product?.item, (item, idx) =>
                            !item?.is_achieve ? (
                              <Badge
                                key={idx}
                                className="badge"
                                label={item?.quantity > 2 ? t('status.second') : t('status.third')}
                                color={item?.quantity ? 'primary' : 'danger'}
                              />
                            ) : (
                              <Badge key={idx} className="badge" label="Achieved" color="danger" />
                            ),
                          ),
                        ),
                      )}
                    </div>
                  </div>

                  <h1 className="name">{flatMapDepth(map(product?.item, (item) => item?.name))}</h1>

                  <div className="rating">
                    {/* <Rating value={Number(Math.ceil(product?.item?.rating || 5))} readOnly /> */}
                    <span className="count">
                      {flatMapDepth(map(product?.item, (item) => item?.comments)).some(
                        (comment) => comment === null,
                      )
                        ? '0 review'
                        : `${size(
                            flatMapDepth(map(product?.item, (item) => item?.comments)),
                          )} reviews`}
                    </span>
                    <Rating readOnly value={Number(get(product?.item, '[0].avg_rate', 0))} />
                  </div>
                  <p className="description">
                    {flatMapDepth(
                      map(product?.item, (item) => item?.description?.replaceAll('&#39;', "'")),
                    )}
                  </p>
                  {/* <p className="description">{product?.shortDescription}</p> */}

                  {flatMapDepth(
                    map(product?.item, (item) =>
                      item?.percent_off ? (
                        <>
                          <span
                            className="price sale-after"
                            style={{ color: '#e60002', fontSize: '24px' }}
                          >
                            {`${map(
                              flatMapDepth(
                                map(product?.item, (item) =>
                                  (item?.sale_off / 100).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2,
                                  }),
                                ),
                              ),
                            )} `}
                          </span>

                          <span
                            className="price"
                            style={{
                              marginLeft: '10px',
                              textDecoration: 'line-through',
                              color: 'gray',
                              fontSize: '18px',
                            }}
                          >
                            {`${map(
                              flatMapDepth(
                                map(product?.item, (item) =>
                                  (item?.price / 100).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2,
                                  }),
                                ),
                              ),
                            )} `}
                          </span>
                        </>
                      ) : (
                        <span className="price">
                          {`${map(
                            flatMapDepth(
                              map(product?.item, (item) =>
                                (item?.price / 100).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  minimumFractionDigits: 2,
                                }),
                              ),
                            ),
                          )} `}
                        </span>
                      ),
                    ),
                  )}

                  <div className="weight ks-product-weight">
                    <span style={{ marginRight: '20px', fontSize: '20px', fontWeight: '400' }}>
                      {t('color')}
                    </span>
                    <div className="wrapper-color">
                      {map(
                        flatMapDepth(map(product?.item, (item) => item?.color)),
                        (color, idx) => (
                          <span
                            key={idx}
                            onClick={() => setSelectedValue(color)}
                            className={classNames('option-color', {
                              '-active': color === selectedValue,
                            })}
                          >
                            <span className="color" style={{ background: `#${color}` }}></span>
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  {!get(product?.item, '[0].is_achieve') && (
                    <>
                      {get(product?.item, '[0].quantity', 0) > 2 && (
                        <div className="quantity kl-product-quantity">
                          <Label className="label">{t('quantity')}</Label>

                          <div className="action">
                            <button onClick={handleMinus} className="button">
                              -
                            </button>
                            <input
                              value={quantity}
                              readOnly
                              onChange={handleChangeQuantity}
                              type="number"
                              className="input"
                            />
                            <button
                              disabled={get(product?.item[0], 'quantity', 0) - quantity === 2}
                              onClick={handlePlus}
                              className="button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}

                      <Button
                        className="add"
                        color="primary"
                        disabled={
                          get(product?.item, '[0].quantity', 0) === 0 ||
                          get(product?.item, '[0].quantity', 0) - quantity === 2 ||
                          role !== 'customer'
                        }
                        fullWidth
                        startAdornment={<i className="fa-light fa-bag-shopping fa-xl" />}
                        onClick={() => {
                          dispatch(
                            addCart({
                              id: get(product?.item, '[0].id', 0),
                              qty: quantity,
                              color: selectedValue,
                            }),
                          );
                          toast.success('Product is added to cart', { position: 'top-center' });
                        }}
                      >
                        {t('add')}
                      </Button>
                    </>
                  )}

                  <div className="footer">
                    <span className="label">Brand: </span>
                    <Link href="/" title="">
                      {map(flatMapDepth(map(product?.item, (item) => item?.brand?.toUpperCase())))}
                    </Link>
                    <br />
                    <br />
                    <span className="label">Share: </span>
                    <div className="group">
                      {map(SHARE, (share, idx) => (
                        <Link
                          href="/"
                          title=""
                          key={`footer-share-${idx}`}
                          rightIcon={<i className={share} />}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="kl-product-tabs">
          <ul className="header">
            <li
              className={classNames('tab', { '-active': activeTab === 0 })}
              onClick={() => setActiveTab(0)}
            >
              <span className="actions">{t('review.title1')}</span>
            </li>
            <li
              className={classNames('tab', { '-active': activeTab === 1 })}
              onClick={() => setActiveTab(1)}
            >
              <span className="actions">
                <span>
                  {flatMapDepth(map(product?.item, (item) => item?.comments)).some(
                    (comment) => comment === null,
                  )
                    ? `0 ${t('review.title3')}`
                    : `${size(flatMapDepth(map(product?.item, (item) => item?.comments)))} ${t(
                        'review.title2',
                      )}`}
                </span>
              </span>
            </li>
          </ul>

          <div className="panes">
            <div className="pane" hidden={activeTab !== 0}>
              <p>
                {flatMapDepth(
                  map(product?.item, (item) => item?.description?.replaceAll('&#39;', "'")),
                )}
              </p>
            </div>
            <div className="pane" hidden={activeTab !== 1}>
              {!isEmpty(flatMapDepth(map(product?.item, (item) => item?.comments))) && (
                <div className="comments">
                  {map(
                    flatMapDepth(map(product?.item, (item) => item?.comments)),
                    (commentData, idx) => {
                      if (commentData && commentData?.rate !== null) {
                        const data = {
                          rate: commentData?.rate,
                          comment: commentData?.comment,
                          created_at: commentData?.created_at,
                          user_name: commentData?.user_name,
                        };

                        return (
                          !isEmpty(data) && (
                            <div key={`comment-${idx}`} className="kl-product-comment">
                              <CommentCard className="card" data={data} />
                            </div>
                          )
                        );
                      }
                    },
                  )}
                </div>
              )}

              <CommentForm
                product_id={get(product?.item, '[0].id', 0)}
                rating
                valueRating={0}
                className="kl-product-review"
                title={t('review.header')}
              />
            </div>
          </div>
        </section>

        <AccordionTab />

        {!isEmpty(recommend) && (
          <section className="kl-product-related">
            <h2 className="title">{t('review.related')}</h2>
            <ProductSlides products={recommend || []} />
          </section>
        )}
      </div>
    </KsLayout>
  );
};

export default Product;
