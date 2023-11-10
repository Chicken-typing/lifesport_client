import KsLayout from '@/layout';
import { useAppDispatch } from '@/store/hooks';
import { MODALS } from '@/store/modals/constants';
import { openModal } from '@/store/modals/slice';
import { CommentCard, ProductSlides, Rating } from '@components/compound';
import { Badge, Button, KaImage, Label, Link } from '@components/primitive';
import CommentForm from '@containers/Blog/CommentForm';
import { IProduct } from '@interfaces/product';
import { routes } from '@utils/routes';
import classNames from 'classnames';
import { isEmpty, map, size, flatMapDepth, filter } from 'lodash';
import { ChangeEvent, FocusEvent, ReactNode, useState, useEffect } from 'react';
import AccordionTab from './AccordionTab';
import { COMMENTS, IMAGES, INFORMATION, NET_WEIGHT, PRODUCTS, SHARE, TAGS } from './constants';
import { useProductQuery } from '@/query/products/get-product';
import { useRouter } from 'next/router';
import Skeleton from '@mui/material/Skeleton';
import { addProduct } from '@/store/cart/slice';
import Radio from '@mui/material/Radio';

const breadcrumbs: ReactNode[] = [
  <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
    Trang chủ
  </Link>,
  <Link href={routes.PRODUCTS} title="homepage" key="blogs" className="kl-page-header-link">
    Sản phẩm
  </Link>,
  <p className="kl-page-header-text" key="blog">
    Chi tiết sản phẩm
  </p>,
];

const Product = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();
  const { query } = router;
  const id = String(query?.id) || '';
  const dispatch = useAppDispatch();

  const handleMinus = () => setQuantity(quantity === 1 ? 1 : quantity - 1);
  const handlePlus = () => setQuantity(quantity + 1);

  const handleBlurQuantity = (e: FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value || 0);

    if (!value || value <= 0) return setQuantity(1);
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) =>
    setQuantity(Number(e.target.value));

  const {
    data: product,
    isError: isErrorProductDetail,
    isFetching: isLoadingProductDetail,
  } = useProductQuery({ id });

  const [selectedValue, setSelectedValue] = useState('');

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

  console.log(product?.item[0]?.quantity);

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
                          // lightBoxData: { defaultActive: idx, images: images|| [] },
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
                          map(product?.item, (item) =>
                            item.percent_off ? (
                              <Badge
                                className="badge"
                                label={`${item?.percent_off * 100}% Discount`}
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
                          map(product?.item, (item) => (
                            <Badge
                              className="badge"
                              label={item?.quantity ? 'in_stock' : 'out_of_stock'}
                              color="primary"
                            />
                          )),
                        ),
                      )}
                    </div>
                  </div>

                  <h1 className="name">{flatMapDepth(map(product?.item, (item) => item.name))}</h1>

                  <div className="rating">
                    {/* <Rating value={Number(Math.ceil(product?.item?.rating || 5))} readOnly /> */}
                    <span className="count">(5 Reviews) | </span>
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
                      Colours:
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

                  {/* <Quantity quantity={quantity} setQuantity={setQuantity} /> */}
                  <div className="quantity kl-product-quantity">
                    <Label className="label">Số lượng</Label>

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

                  <Button
                    className="add"
                    color="primary"
                    fullWidth
                    startAdornment={<i className="fa-light fa-bag-shopping fa-xl" />}
                    onClick={() =>
                      dispatch(
                        addProduct({
                          quantity: quantity,
                          product: {
                            id: product?.item[0]?.id || '',
                            name: product?.item[0]?.name || '',
                            price: product?.item[0]?.sale_off
                              ? product?.item[0]?.sale_off
                              : product?.item[0]?.price || 0,
                            quantity: product?.item[0]?.quantity || 0,
                            thumbnail: product?.item[0]?.images[0] || '',
                            color: selectedValue,
                          },
                        }),
                      )
                    }
                  >
                    Thêm vào giỏ hàng
                  </Button>

                  <div className="like">
                    <Button
                      onClick={() => dispatch(openModal({ view: MODALS.WISHLIST }))}
                      className="wishlist action"
                      variant="contained"
                      color="light"
                      startAdornment={<i className="fa-sharp fa-solid fa-heart" />}
                    >
                      Danh sách yêu thích
                    </Button>
                  </div>

                  <div className="footer">
                    <span className="label">Brand: </span>
                    <Link href="/" title="">
                      {map(flatMapDepth(map(product?.item, (item) => item.brand)))}
                    </Link>
                    <br />
                    {/* <span className="label">Tags: </span> */}
                    {/* <div className="tags">
                      {map(TAGS, (tag, idx) => (
                        <Link href="/" title="" key={`footer-tags-${idx}`}>
                          {tag},
                        </Link>
                      ))}
                    </div> */}
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
              <span className="actions"> Mô tả</span>
            </li>
            <li
              className={classNames('tab', { '-active': activeTab === 1 })}
              onClick={() => setActiveTab(1)}
            >
              <span className="actions">
                Bình luận <span>(5)</span>
              </span>
            </li>
          </ul>

          <div className="panes">
            <div className="pane" hidden={activeTab !== 0}>
              <p>{map(flatMapDepth(map(product?.item, (item) => item.description)))}</p>
            </div>
            {/* <div className="pane" hidden={activeTab !== 1}>
              <table className="table-info">
                <tbody className="body">
                  {map(INFORMATION, ({ label, value }, idx) => (
                    <tr className="rows" key={`info-${idx}`}>
                      <th className="heading">{label}</th>
                      <td className="content">
                        <p className="text">{value}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <div className="pane" hidden={activeTab !== 1}>
              <div className="comments">
                {map(COMMENTS, ({ data, rating }, idx) => (
                  <div key={`comment-${idx}`} className="kl-product-comment">
                    <CommentCard className="card" data={data} hasRating valueRating={rating} />
                  </div>
                ))}
              </div>
              <CommentForm
                rating
                valueRating={0}
                className="kl-product-review"
                title="Add A Review"
              />
            </div>
          </div>
        </section>

        <AccordionTab />

        <section className="kl-product-related">
          <h2 className="title">Sản phẩm tương tự</h2>
          <ProductSlides products={PRODUCTS as IProduct[]} />
        </section>
      </div>
    </KsLayout>
  );
};

export default Product;
