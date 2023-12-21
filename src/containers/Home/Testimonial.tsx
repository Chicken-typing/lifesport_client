import React from 'react';
import { Button, KaImage } from '@components/primitive';
import classNames from 'classnames';
import { FC } from 'react';
import { useSwiperSlide } from 'swiper/react';
import { Avatar } from '@mui/material';
interface ITestimonialProps {
  name: string;
  review: string;
  created_at: string;
}

const Testimonial: FC<ITestimonialProps> = ({ name, review, created_at }) => {
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
        <Avatar src="/images/feedback.png" className="avatar" />
        <p className="name">{name}</p>

        <div className="address">
          <span className="city">{created_at}</span>
        </div>
      </div>
      <div className="review">
        <p className="text">{review}</p>
      </div>
    </div>
  );
};

export default Testimonial;
