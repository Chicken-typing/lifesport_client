import KsLayout from '@/layout';
import { useCartQuery } from '@/query/carts/getCarts';
import { useProductsQuery } from '@/query/products/get-products';
import { selectCarts } from '@/store/cartUser/selector';
import { getCarts, removeCart, clearCart } from '@/store/cartUser/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ProductSlides } from '@components/compound';
import Quantity from '@components/compound/Quantity';
import { Button, KaImage, Link } from '@components/primitive';
import { IQueryResultCart } from '@interfaces/app';
import { ICheckout } from '@interfaces/checkout';
import { Skeleton } from '@mui/material';
import { changeColor } from '@utils/changeColor';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { isEmpty, map, size, times, difference } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCheckoutMutation } from '../../query/checkout/checkoutMutation';

const Cart = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = cookieStorage?.getAccessTokenInfo();
  const decoded = decodeToken(token || '');

  const { mutateAsync: checkoutMutation, isLoading: loadingMutation } = useCheckoutMutation();
  const { data: products } = useProductsQuery({});
  const router = useRouter();
  const recommend = products?.items?.filter((item) => item.sold > 2);

  // query cart
  const getCartUser = useAppSelector(selectCarts);
  const getIdCart: string = map(getCartUser, (item) => item?.id).join(',');
  const { data: cartsInfo, isFetching: loadingCart } = useCartQuery({ products: getIdCart });

  useEffect(() => {
    if (cartsInfo?.status === 'error' && cartsInfo?.url) {
      window.open(cartsInfo?.url, '_self');
    }
  }, [cartsInfo?.status, cartsInfo?.url]);

  const getCartItem = [] as unknown as IQueryResultCart['data'];
  getCartUser.map((item: any, index) => {
    let temp = item;

    cartsInfo?.data?.forEach((product) => {
      if (item?.id === product?.id) {
        if (product?.is_achieve) {
          toast.error(`${product?.name} is out stock`);
          temp = difference(temp, [temp[index]]);
        } else {
          getCartItem.push({ ...temp, ...product });
        }
      }
    });
  });

  useEffect(() => {
    const getCart = async () => {
      try {
        const cart = await localStorage.getItem('cartUser');
        if (cart) {
          dispatch(getCarts(JSON.parse(cart)));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setIsLoading(false);
      }
    };
    getCart();
  }, [dispatch]);

  const subTotal = map(getCartItem, (item) => item?.price * item?.qty);

  const handleCheckout = () => {
    const data: ICheckout = {
      email: decoded?.email,
      products: map(getCartItem, (item) => {
        return {
          id: item?.id,
          line_item: {
            quantity: Number(item?.qty),
            price_data: {
              currency: 'usd',
              product_data: {
                name: item?.name,
                images: [item?.thumbnail],
                metadata: {
                  color: item?.color,
                  product_id: item?.id,
                },
                tax_code: 'txcd_99999999',
              },
              unit_amount: item?.price,
            },
          },
        };
      }),
    };

    if (token) {
      checkoutMutation(data)
        .then(async (response: any) => {
          console.log(response);
          if (response?.status === 'success') {
            const url = await response?.url;
            window.open(url, '_blank');
          } else {
            toast.error('There are currently not enough products in stock, please understand', {
              position: 'top-center',
            });
          }
          dispatch(clearCart());
        })

        .catch((error: any) => console.log(error));
    } else {
      toast.error('You should login to checkout', { position: 'top-center' });
    }
  };

  return (
    <KsLayout title="Giỏ hàng">
      <div className="kl-cart kl-container">
        <h2 className="heading">Cart</h2>
        {!loadingCart && !isEmpty(getCartUser) && !isEmpty(getCartItem) ? (
          <div className="row wrapper">
            <div className="col-12 col-xl-8 product">
              <table className="kl-cart-table">
                <thead className="head">
                  <tr className="rows">
                    <th className="remove _style-rows"></th>
                    <th className="thumbnail _style-rows"></th>
                    <th className="name _style-rows">PRODUCT</th>
                    <th className="price _style-rows">PRICE</th>
                    <th className="quantity _style-rows">QUANTITY</th>
                    <th className="total _style-rows">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody className="content">
                  {map(getCartItem, (item, idx) => (
                    <tr className="rows" key={`cart-product-${idx}`}>
                      <td className="remove _style-rows">
                        <button
                          onClick={() => dispatch(removeCart({ id: item?.id, color: item?.color }))}
                          className="btn"
                        >
                          <i className="fa-light fa-xmark icon" />
                        </button>
                      </td>
                      <td className="thumbnail  _style-rows">
                        <KaImage className="image" src={item?.thumbnail} alt="" />
                      </td>
                      <td className="name _style-rows">
                        <Link href="" title="" className="link">
                          {item?.name}
                        </Link>
                        <div>color: {changeColor(item?.color)}</div>
                      </td>
                      <td className="price _style-rows">
                        {(item?.price / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="quantity _style-rows">
                        <Quantity
                          quantity={
                            Number(item?.qty) < Number(item?.quantity)
                              ? Number(item?.qty)
                              : Number(item?.quantity)
                          }
                          id={item?.id}
                          color={item?.color || ''}
                          disabled={Number(item?.quantity) - item?.qty <= 2}
                        />

                        {Number(item?.quantity) - item?.qty <= 7 && (
                          <span style={{ display: 'flex', color: 'red', justifyContent: 'center' }}>
                            {Number(item?.quantity) - item?.qty - 2 > 0
                              ? `${Number(item?.quantity) - item?.qty - 2} Product Left`
                              : 'Count In Stock'}
                          </span>
                        )}
                      </td>
                      <td className="total _style-rows">
                        {((item?.price * item?.qty) / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="kl-cart-responsive">
                <tbody className="content">
                  {map(getCartItem, (item, idx) => (
                    <tr className="rows" key={`cart-product-${idx}`}>
                      <td className="thumbnail _style-rows">
                        <KaImage className="image" src={item?.thumbnail} alt="" />
                      </td>
                      <td className="remove _style-rows">
                        <button
                          onClick={() => dispatch(removeCart({ id: item?.id, color: item?.color }))}
                          className="btn"
                        >
                          <i className="fa-light fa-xmark icon" />
                        </button>
                      </td>
                      <td className="name _style-rows _style-flex">
                        <Link href="" title="" className="link">
                          {item?.name}
                        </Link>
                      </td>
                      <div>color: {changeColor(item?.color)}</div>
                      <td className="price _style-rows _style-flex">
                        <span className="title -text-sm">PRICE: </span>
                        <span className="cost">
                          {(item?.price / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                      <td className="quantity _style-rows _style-flex">
                        <span className="title -text-sm">QUANTITY: </span>
                        <Quantity
                          quantity={item?.qty}
                          id={item?.id}
                          color={item?.color}
                          disabled={Number(item?.quantity) - item?.qty <= 2}
                        />
                      </td>
                      <td className="total _style-rows _style-flex">
                        <span className="title -text-sm">SUBTOTAL: </span>
                        <span className="cost">
                          {((item?.price * item?.qty) / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-12 col-xl-4 totals">
              <h2 className="header">Cart totals</h2>
              <table className="kl-cart-order">
                <tbody className="content">
                  <tr className="sub">
                    <th className="title -style-totals">Subtotal</th>
                    <td className="cost -style-totals">
                      {!isEmpty(subTotal) &&
                        (
                          subTotal.reduce((sub, currentItem) => sub + currentItem) / 100
                        ).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                        })}
                    </td>
                  </tr>

                  <tr className="total">
                    <th className="title -style-totals">Total</th>
                    <td className="cost -style-totals">
                      {!isEmpty(subTotal) &&
                        (
                          subTotal.reduce((sub, currentItem) => sub + currentItem) / 100
                        ).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                        })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button
                disabled={decoded?.role !== 'customer'}
                isLoading={loadingMutation}
                onClick={handleCheckout}
                className="btn"
              >
                Proceed To Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="loading">
            {loadingCart ? (
              <div className="wrapper">
                {times(3, (idx) => (
                  <div className="skeleton" key={`skeleton-${idx}`}>
                    <Skeleton animation="wave" variant="rectangular" width="90px" height="90px" />
                    <Skeleton animation="wave" width="35%" height="40px" />
                    <Skeleton animation="wave" width="15%" height="40px" />
                    <Skeleton animation="wave" width="15%" height="40px" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">
                <i className="fa-sharp fa-light fa-cart-xmark fa-2xl icon" />
                <p className="title">Your Cart is empty!</p>
                <Button onClick={() => router.push({ pathname: '/' })} className="button">
                  Return To Shop
                </Button>
              </div>
            )}
          </div>
        )}

        <h2 className="title">You may be interested...</h2>
        <ProductSlides products={recommend || []} />
      </div>
    </KsLayout>
  );
};

export default Cart;
