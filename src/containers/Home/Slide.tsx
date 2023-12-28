import { Button, KaImage } from '@components/primitive';
import classNames from 'classnames';
import { FC } from 'react';
import { useSwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
interface ISlideProps {
  image: string;
  title: string;
  caption: string;
  color?: string;
}

const Slide: FC<ISlideProps> = ({ image, title, caption, color }) => {
  const swiperSlide = useSwiperSlide();
  const router = useRouter();

  return (
    <div
      className={classNames(
        'kl-home-slide',
        { '-active': swiperSlide.isActive },
        { '-next': swiperSlide.isNext },
      )}
    >
      <div className="overlay" />

      <KaImage objectFit="cover" src={image} alt={image} className="image _overflow-hidden" />

      <div className="content">
        <div className="inner">
          <h2 className="title _overflow-hidden">
            <span
              className={classNames(
                `text _translateY-hidden `,
                { '_translateY-show': swiperSlide.isActive },
                `-${color}`,
              )}
            >
              {title}
            </span>
          </h2>

          <div className="caption _overflow-hidden">
            <p
              className={classNames(
                `text _translateY-hidden`,
                { '_translateY-show': swiperSlide.isActive },
                `-${color}`,
              )}
            >
              {caption}
            </p>
          </div>

          <div className="kl-home-slide-button _overflow-hidden">
            <Button
              color="light"
              onClick={() => router.push('/products/list')}
              className={classNames(`action _delay _translateY-hidden`, {
                '_translateY-show': swiperSlide.isActive,
              })}
              endAdornment={<i className="fa-solid fa-angle-right fa-sm" />}
            >
              Explore Our Rides
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
