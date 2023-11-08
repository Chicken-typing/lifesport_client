import { useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/store/modals/slice';
import { Button, KaImage, Link } from '@components/primitive';
import { routes } from '@utils/routes';
import { FC } from 'react';

const WishlistPopup: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="kl-wishlist-modal">
      <div className="top">
        <div className="title">
          <span className="name"> Wishlist</span>
          <span onClick={() => dispatch(closeModal())} className="close">
            <i className="fa-light fa-times" />
          </span>
        </div>
      </div>
      <div className="middle">
        <div className="item">
          <div className="remove">
            <span className="close">
              <i className="fa-light fa-times" />
            </span>
          </div>
          <div className="images">
            <KaImage
              src="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_18_1.jpg"
              alt=""
              className="image"
              objectFit="contain"
            />
          </div>
          <div className="info">
            <div className="name">Blueberry Hibiscus White Tea</div>
            <div className="price">$10.00</div>
          </div>
          <Button className="add" color="primary">
            Add to cart
          </Button>
        </div>
      </div>
      <div className="bottom">
        <div className="content">
          <Link href="/" title="wishlist" className="open">
            open wishlist page
          </Link>
          <Link href={routes.PRODUCTS} title="wishlist" className="continue">
            continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPopup;
