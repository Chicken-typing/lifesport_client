import { useAppDispatch } from '@/store/hooks';
import { MODALS } from '@/store/modals/constants';
import { closeModal, openModal } from '@/store/modals/slice';
import { Rating } from '@components/compound';
import { Button, KaImage, Link, Tag } from '@components/primitive';
import { PRODUCTS, TAGS } from '@containers/Cart/constant';
import Quantity from '../Quantity';
import { map } from 'lodash';
import { FC } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const CartPopup: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="kl-cart-modal">
      <div className="header">
        <button className="action" onClick={() => dispatch(closeModal())}>
          <i className="fa-regular fa-xmark fa-lg" />
        </button>
      </div>
      <div className="wrapper">
        <div className=" left">
          <Button
            className="action -left"
            iconOnly
            circle
            color="light"
            endAdornment={<i className="fa-light fa-chevron-left fa-xl icon" />}
          />
          <Swiper className="swiper">
            {map(PRODUCTS, ({ images }, idx) => (
              <SwiperSlide key={idx}>
                <Swiper
                  modules={[Pagination, Navigation]}
                  allowTouchMove={true}
                  loop
                  navigation={{
                    nextEl: '.kl-cart-modal > .wrapper > .left  > .action.-right',
                    prevEl: '.kl-cart-modal > .wrapper > .left  > .action.-left',
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  className="kl-cart-swiper"
                >
                  {map(images, (item, idx) => (
                    <SwiperSlide className="kl-cart-slides" key={idx}>
                      <KaImage className="images" src={item} alt={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            className="action -right"
            iconOnly
            circle
            color="light"
            endAdornment={<i className="fa-light fa-chevron-right fa-xl icon" />}
          />
        </div>

        <div className="right">
          <div className="content">
            <h1 className="name">Plum Berry Organic, Fair Trade Black Tea</h1>

            <div className="rating">
              <Rating className="rating" value={4} readOnly />
              <span className="count">
                (
                <Link className="link" title="review" href="/">
                  5 Reviews
                </Link>
                )
              </span>
            </div>

            <span className="price">$4.00–$28.00</span>

            <p className="description">
              Soluta aspernatur asperiores reiciendis sit consequatur et reprehenderit. Modi ad
              voluptatum deleniti suscipit dolor minus. Nemo totam aut est voluptatem rerum odio et.
            </p>

            {/* <Quantity /> */}

            <Button
              className="add"
              color="primary"
              fullWidth
              startAdornment={<i className="fa-light fa-bag-shopping fa-xl" />}
            >
              Add to cart
            </Button>

            <div className="like">
              <Button
                onClick={() => dispatch(openModal({ view: MODALS.WISHLIST }))}
                className="wishlist action"
                variant="contained"
                color="light"
                startAdornment={<i className="fa-sharp fa-solid fa-heart" />}
              >
                Browse Wishlist
              </Button>
            </div>

            <div className="footer">
              <span className="label">Category: </span>
              <Link className="link" href="/" title="">
                Vegan Teas
              </Link>
              <br />
              <div className="kl-cart-tags">
                <span className="label">Tags:</span>
                <span className="wrapper">
                  {map(TAGS, ({ title, route }, idx) => (
                    <Tag className="tag" key={idx} label={title} link={route} hasUnderline />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
