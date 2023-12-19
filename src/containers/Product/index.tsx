import KsLayout from '@/layout';
import { useProductQuery } from '@/query/products/get-product';
import { useProductsQuery } from '@/query/products/get-products';
import { addProduct } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { MODALS } from '@/store/modals/constants';
import { openModal } from '@/store/modals/slice';
import { CommentCard, ProductSlides } from '@components/compound';
import { Badge, Button, KaImage, Label, Link } from '@components/primitive';
import CommentForm from '@containers/Blog/CommentForm';
import Radio from '@mui/material/Radio';
import Skeleton from '@mui/material/Skeleton';
import { routes } from '@utils/routes';
import classNames from 'classnames';
import { flatMapDepth, isEmpty, map, size, get } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { ChangeEvent, FocusEvent, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AccordionTab from './AccordionTab';
import { SHARE } from './constants';

const Product = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState('');

  const router = useRouter();
  const { query } = router;
  const id = Number(query?.id) || 0;
  const dispatch = useAppDispatch();

  const { t } = useTranslation('detail');

  const {
    data: product,
    isError: isErrorProductDetail,
    isFetching: isLoadingProductDetail,
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
    (item) => item.brand === product?.item[0]?.brand && item.id !== product?.item[0]?.id,
  );

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    }
  };
  const handlePlus = () => {
    const currenQuantity = product?.item[0]?.quantity || 0;

    setQuantity(quantity < currenQuantity ? quantity + 1 : currenQuantity);
  };

  const handleBlurQuantity = (e: FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value || 0);
    const currenQuantity = product?.item[0]?.quantity || 0;

    if (value > currenQuantity) {
      setQuantity(currenQuantity);
    }
    if (!value || value <= 0) return setQuantity(1);
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    if (!product?.item[0]?.color[0]) {
      return;
    }
    setSelectedValue(product?.item[0]?.color[0] || '');
  }, [product]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

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
                            images: flatMapDepth(map(product?.item, (item) => item.images)),
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
                            item.percent_off ? (
                              <Badge
                                key={idx}
                                className="badge"
                                label={`${t('status.first')} ${item?.percent_off}% `}
                                color="danger"
                              />
                            ) : (
                              <div></div>
                            ),
                          ),
                        ),
                      )}

                      {map(
                        flatMapDepth(
                          map(product?.item, (item, idx) => (
                            <Badge
                              key={idx}
                              className="badge"
                              label={item?.quantity ? t('status.second') : t('status.third')}
                              color={item?.quantity ? 'primary' : 'danger'}
                            />
                          )),
                        ),
                      )}
                    </div>
                  </div>

                  <h1 className="name">{flatMapDepth(map(product?.item, (item) => item.name))}</h1>

                  <div className="rating">
                    {/* <Rating value={Number(Math.ceil(product?.item?.rating || 5))} readOnly /> */}
                    <span className="count">
                      {flatMapDepth(map(product?.item, (item) => item.comments)).some(
                        (comment) => comment === null,
                      )
                        ? '0 Review'
                        : `${size(
                            flatMapDepth(map(product?.item, (item) => item.comments)),
                          )} Reviews`}
                      |
                    </span>
                    <span className="number">SKU: HCMUTE2023</span>
                  </div>

                  {/* <p className="description">{product?.shortDescription}</p> */}

                  {flatMapDepth(
                    map(product?.item, (item) =>
                      item.percent_off ? (
                        <>
                          <span
                            className="price sale-after"
                            style={{ color: '#e60002', fontSize: '24px' }}
                          >
                            {`${map(
                              flatMapDepth(
                                map(product?.item, (item) =>
                                  (item.sale_off / 100).toLocaleString('en-US', {
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
                                  (item.price / 100).toLocaleString('en-US', {
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
                                (item.price / 100).toLocaleString('en-US', {
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
                    {map(flatMapDepth(map(product?.item, (item) => item?.color)), (color, idx) => (
                      <Radio
                        {...controlProps(color)}
                        color="secondary"
                        sx={{
                          marginRight: '10px',

                          '& .MuiTouchRipple-root': {
                            backgroundColor: `#${color}`,
                          },
                          '& .MuiSvgIcon-root': {
                            height: 20,
                            width: 20,
                          },
                          ' &.Mui-checked': {
                            color: `#${color}`,
                            padding: '0',

                            '&.Mui-checked .MuiTouchRipple-root': {
                              backgroundColor: 'unset',
                              // height: 30,
                              // width: 30,
                            },
                            ' .MuiSvgIcon-root': {
                              backgroundColor: 'unset',
                              height: 45,
                              width: 45,
                            },
                          },
                        }}
                      />
                    ))}
                  </div>

                  {get(product?.item[0], 'quantity', 0) !== 0 && (
                    <div className="quantity kl-product-quantity">
                      <Label className="label">{t('quantity')}</Label>

                      <div className="action">
                        <button onClick={handleMinus} className="button">
                          -
                        </button>
                        <input
                          value={quantity}
                          onBlur={handleBlurQuantity}
                          onChange={handleChangeQuantity}
                          type="number"
                          className="input"
                        />
                        <button onClick={handlePlus} className="button">
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <Button
                    className="add"
                    color="primary"
                    disabled={product?.item[0]?.quantity === 0}
                    fullWidth
                    startAdornment={<i className="fa-light fa-bag-shopping fa-xl" />}
                    onClick={() => {
                      dispatch(
                        addProduct({
                          quantity: quantity,
                          product: {
                            id: product?.item[0]?.id || 0,
                            name: product?.item[0]?.name || '',
                            price: product?.item[0]?.sale_off
                              ? product?.item[0]?.sale_off
                              : product?.item[0]?.price || 0,
                            quantity: product?.item[0]?.quantity || 0,
                            thumbnail: product?.item[0]?.images[0] || '',
                            color: selectedValue,
                          },
                        }),
                      );
                      toast.success('Product is added to cart', { position: 'top-center' });
                    }}
                  >
                    {t('add')}
                  </Button>

                  <div className="footer">
                    <span className="label">Brand: </span>
                    <Link href="/" title="">
                      {map(flatMapDepth(map(product?.item, (item) => item.brand.toUpperCase())))}
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
                  {flatMapDepth(map(product?.item, (item) => item.comments)).some(
                    (comment) => comment === null,
                  )
                    ? `0 ${t('review.title3')}`
                    : `${size(flatMapDepth(map(product?.item, (item) => item.comments)))} ${t(
                        'review.title2',
                      )}`}
                </span>
              </span>
            </li>
          </ul>

          <div className="panes">
            <div className="pane" hidden={activeTab !== 0}>
              <p>{map(flatMapDepth(map(product?.item, (item) => item.description)))}</p>
            </div>
            <div className="pane" hidden={activeTab !== 1}>
              {!isEmpty(flatMapDepth(map(product?.item, (item) => item?.comments))) && (
                <div className="comments">
                  {map(
                    flatMapDepth(map(product?.item, (item) => item?.comments)),
                    (commentData, idx) => {
                      if (commentData && commentData.rate !== null) {
                        const data = {
                          rate: commentData.rate,
                          comment: commentData.comment,
                          created_at: commentData.created_at,
                          user_name: commentData.user_name,
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
                product_id={product?.item[0]?.id ? product?.item[0]?.id : 0}
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
