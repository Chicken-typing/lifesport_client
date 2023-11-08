import { SwiperSlide, Swiper } from 'swiper/react';
import { ProductCard } from '../ProductCard';
import { FC } from 'react';
import { map } from 'lodash';
import { breakpoints } from '@/utils/constants';
import { Autoplay } from 'swiper';
import { IProduct } from '@interfaces/product';

interface IProductSlidesProps {
  products: IProduct[];
}

export const ProductSlides: FC<IProductSlidesProps> = ({ products }) => {
  return (
    <div className="kl-product-slides">
      <Swiper
        breakpoints={{
          [breakpoints.xl]: {
            slidesPerView: 4.5,
          },
          [breakpoints.md]: {
            slidesPerView: 3.5,
          },
          [breakpoints.xs]: {
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay]}
        className="swiper kl-products-slides"
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          waitForTransition: true,
        }}
      >
        {map(products, (item, idx) => (
          <SwiperSlide className="kl-products-slide" key={`product-slide-${idx}`}>
            <ProductCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
