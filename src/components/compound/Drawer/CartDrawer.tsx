import { selectCart } from '@/store/cart/selector';
import { closeDrawer } from '@/store/drawers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, KaImage } from '@components/primitive';
import { routes } from '@utils/routes';
import { map, size, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { removeProduct } from '@/store/cart/slice';
import { selectTotal } from '../../../store/cart/selector';
import { Drawer } from '@mui/material';
import { useCheckoutMutation } from '@/query/checkout/checkoutMutation';
import { toast } from 'react-toastify';
import { ICheckout } from '@interfaces/checkout';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { changeColor } from '@utils/changeColor';

const CartDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const carts = useAppSelector(selectCart);

  const total = useAppSelector(selectTotal);

  const token = cookieStorage?.getAccessTokenInfo();
  const decoded = decodeToken(token || '');

  const { mutateAsync: checkoutMutation, isLoading: loadingMutation } = useCheckoutMutation();

  const handleViewCart = () => {
    dispatch(closeDrawer());
    router.push({ pathname: routes.CART });
  };

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
          const url = await response?.url;
          onClose();
          window.open(url, '_blank');
        })
        .catch((error: any) => console.log(error));
    } else {
      toast.error('You should login to checkout', { position: 'top-center' });
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="kl-drawer-cart">
        <div className="kl-cart-drawer">
          <div className="header">
            <span className="title">Cart</span>
            <span className="close" onClick={onClose}>
              Close <i className="fa-light fa-xmark icon" />
            </span>
          </div>

          <div className="content">
            <ul className="products">
              {size(carts) !== 0 ? (
                map(carts, ({ product: { name, price, thumbnail, id, color }, quantity }, idx) => (
                  <li className="item" key={`cart-${idx}`}>
                    <KaImage
                      src={thumbnail}
                      alt="cart"
                      objectFit="contain"
                      ratio="square"
                      className="image"
                    />
                    <div className="info">
                      <div className="name">{name}</div>
                      <div className="group">
                        <span className="price">
                          {(price / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <div className="detail">
                          <div className="quantity">{`Qty: ${quantity}`}</div>
                          <div className="color">{`Color: ${changeColor(color)}`}</div>
                        </div>
                      </div>
                    </div>
                    <span className="close" onClick={() => dispatch(removeProduct({ id, color }))}>
                      <i className="fa-light fa-xmark icon" />
                    </span>
                  </li>
                ))
              ) : (
                <p className="empty">No products in the cart.</p>
              )}
            </ul>
          </div>

          {size(carts) !== 0 && (
            <div className="footer">
              <div className="total">
                <span className="subtotal">Total:</span>
                <span className="price">
                  {!isEmpty(total) &&
                    (total.reduce((sub, currentItem) => sub + currentItem) / 100).toLocaleString(
                      'en-US',
                      {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      },
                    )}
                </span>
              </div>
              <Button fullWidth color="light" className="button cart" onClick={handleViewCart}>
                View Cart
              </Button>
              <Button
                isLoading={loadingMutation}
                onClick={handleCheckout}
                fullWidth
                className="button checkout"
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
