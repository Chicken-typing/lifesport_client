import React from 'react';
import { Button, KaImage } from '@components/primitive';
import classNames from 'classnames';
import { FC } from 'react';
import { useSwiperSlide } from 'swiper/react';
import { Avatar } from '@mui/material';
interface ITestimonialProps {
  image: string;
  name: string;
  province?: string;
  city: string;
  district?: string;
  review: string;
}

const Testimonial: FC<ITestimonialProps> = ({ image, name, province, city, district, review }) => {
  const swiperSlide = useSwiperSlide();
  return (
    <div
      className={classNames(
        'kl-home-testimonial',
        { '-active': swiperSlide.isActive },
        { '-next': swiperSlide.isNext },
      )}
    >
      <div className="info">
        <Avatar src={image} className="avatar" />
        <p className="name">{name}</p>
        {province ? (
          <div className="address">
            <span className="city">{`${city}, `}</span>
            <span className="province">{province}</span>
          </div>
        ) : (
          <div className="address">
            <span className="district">{`${district}, `}</span>
            <span className="city">{city}</span>
          </div>
        )}
      </div>
      <div className="review">
        <p className="text">{review}</p>
      </div>
    </div>
  );
};

export default Testimonial;
