import { selectCart } from '@/store/cart/selector';
import { closeDrawer } from '@/store/drawers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, KaImage } from '@components/primitive';
import { routes } from '@utils/routes';
import { map, size } from 'lodash';
import { useRouter } from 'next/router';
import { removeProduct } from '@/store/cart/slice';

const CartDrawer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const carts = useAppSelector(selectCart);

  const handleDeleteProduct = (idx: number) => {};

  return (
    <div className="kl-cart-drawer">
      <div className="header">
        <span className="title">Cart</span>
        <span className="close" onClick={() => dispatch(closeDrawer())}>
          Close <i className="fa-light fa-xmark icon" />
        </span>
      </div>

      <div className="content">
        <ul className="products">
          {size(carts) !== 0 ? (
            map(carts, ({ product: { name, price, thumbnail, id }, quantity }, idx) => (
              <li className="item" key={`cart-${idx}`}>
                <KaImage
                  src={thumbnail[0]}
                  alt="cart"
                  objectFit="contain"
                  ratio="square"
                  className="image"
                />
                <div className="info">
                  <div className="name">{name}</div>
                  <div className="group">
                    {quantity} x <span className="price">${price}</span>
                  </div>
                </div>
                <span className="close" onClick={() => dispatch(removeProduct(id))}>
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
            <span className="price">$1,272</span>
          </div>
          <Button
            fullWidth
            color="light"
            className="button cart"
            onClick={() => router.push({ pathname: routes.CART })}
          >
            View Cart
          </Button>
          <Button fullWidth className="button checkout">
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
