import KsLayout from '@/layout';
import { useProductsQuery } from '@/query/products/get-products';
import { selectCart, selectTotal } from '@/store/cart/selector';
import { getCartList, removeProduct } from '@/store/cart/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MODALS } from '@/store/modals/constants';
import { openModal } from '@/store/modals/slice';
import { ProductSlides } from '@components/compound';
import Quantity from '@components/compound/Quantity';
import { Button, KaImage, Link } from '@components/primitive';
import { Skeleton } from '@mui/material';
import { changeColor } from '@utils/changeColor';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { isEmpty, map, times } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICheckout } from '../../interfaces/checkout';
import { useCheckoutMutation } from '../../query/checkout/checkoutMutation';
import { clearCart } from '@/store/cart/slice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector(selectCart);
  const subTotal = useAppSelector(selectTotal);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = cookieStorage?.getAccessTokenInfo();
  const decoded = decodeToken(token || '');
  const { mutateAsync: checkoutMutation, isLoading: loadingMutation } = useCheckoutMutation();
  const { data: products } = useProductsQuery({});
  const router = useRouter();
  const recommend = products?.items.filter((item) => item.sold > 2);

  useEffect(() => {
    const getCart = async () => {
      try {
        const cart = await localStorage.getItem('carts');
        if (cart) {
          dispatch(getCartList(JSON.parse(cart)));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setIsLoading(false);
      }
    };
    getCart();
  }, [dispatch]);

  const handleCheckout = () => {
    const data: ICheckout = {
      email: decoded?.email,
      products: map(carts, (item) => {
        return {
          id: item?.product?.id,
          line_item: {
            quantity: item?.quantity,
            price_data: {
              currency: 'usd',
              product_data: {
                name: item?.product?.name,
                images: [item?.product?.thumbnail],
                metadata: {
                  color: item?.product?.color,
                  product_id: item?.product?.id,
                },
                tax_code: 'txcd_99999999',
              },
              unit_amount: item?.product?.price,
            },
          },
        };
      }),
    };
    if (token) {
      checkoutMutation(data)
        .then(async (response: any) => {
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
        {!isLoading && !isEmpty(carts) ? (
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
                  {map(
                    carts,
                    (
                      {
                        product: { name, price, thumbnail, id, quantity: quantityItem, color },
                        quantity,
                        total,
                      },
                      idx,
                    ) => (
                      <tr className="rows" key={`cart-product-${idx}`}>
                        <td className="remove _style-rows">
                          <button
                            onClick={() => dispatch(removeProduct({ id, color }))}
                            className="btn"
                          >
                            <i className="fa-light fa-xmark icon" />
                          </button>
                        </td>
                        <td className="thumbnail  _style-rows">
                          <KaImage className="image" src={thumbnail} alt="" />
                        </td>
                        <td className="name _style-rows">
                          <Link href="" title="" className="link">
                            {name}
                          </Link>
                          <div>color: {changeColor(color)}</div>
                        </td>
                        <td className="price _style-rows">
                          {(price / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="quantity _style-rows">
                          <Quantity
                            quantity={quantity}
                            id={id}
                            color={color}
                            disabled={quantityItem - quantity - 2 === 0}
                          />

                          {quantityItem - quantity <= 7 && (
                            <span
                              style={{ display: 'flex', color: 'red', justifyContent: 'center' }}
                            >
                              {quantityItem - quantity - 2 > 0
                                ? `${quantityItem - quantity - 2} Product Left`
                                : 'Count In Stock'}
                            </span>
                          )}
                        </td>
                        <td className="total _style-rows">
                          {(total / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>

              <table className="kl-cart-responsive">
                <tbody className="content">
                  {map(
                    carts,
                    (
                      {
                        product: { name, price, thumbnail, color, id, quantity: quantityItem },
                        quantity,
                        total,
                      },
                      idx,
                    ) => (
                      <tr className="rows" key={`cart-product-${idx}`}>
                        <td className="thumbnail _style-rows">
                          <KaImage className="image" src={thumbnail} alt="" />
                        </td>
                        <td className="remove _style-rows">
                          <button
                            onClick={() => dispatch(removeProduct({ id, color }))}
                            className="btn"
                          >
                            <i className="fa-light fa-xmark icon" />
                          </button>
                        </td>
                        <td className="name _style-rows _style-flex">
                          <Link href="" title="" className="link">
                            {name}
                          </Link>
                        </td>
                        <div>color: {changeColor(color)}</div>
                        <td className="price _style-rows _style-flex">
                          <span className="title -text-sm">PRICE: </span>
                          <span className="cost">
                            {(price / 100).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </td>
                        <td className="quantity _style-rows _style-flex">
                          <span className="title -text-sm">QUANTITY: </span>
                          <Quantity
                            quantity={quantity}
                            id={id}
                            color={color}
                            disabled={quantity === quantityItem}
                          />
                        </td>
                        <td className="total _style-rows _style-flex">
                          <span className="title -text-sm">SUBTOTAL: </span>
                          <span className="cost">
                            {(total / 100).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </td>
                      </tr>
                    ),
                  )}
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
            {isLoading ? (
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
