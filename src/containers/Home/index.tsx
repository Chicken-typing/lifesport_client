import KsLayout from '@/layout';
import { useFeedback } from '@/query/feedback/getFeedback';
import { useProductsQuery } from '@/query/products/get-products';
import { useAppDispatch } from '@/store/hooks';
import { breakpoints } from '@/utils/constants';
import { routes } from '@/utils/routes';
import { ProductSlides } from '@components/compound';
import { Button, Link } from '@components/primitive';
import { format, parse } from 'date-fns';
import { isEmpty, map } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import BannerCard from './BannerCard';
import { IHomeBanner, SLIDES } from './constants';
import Slide from './Slide';
import Testimonial from './Testimonial';

const Home = () => {
  const { data: products, isLoading: isLoading } = useProductsQuery({});
  const { data: feedbacks, isFetching } = useFeedback({});
  const dispatch = useAppDispatch();

  const { t } = useTranslation('home');

  const banner = t('banner', {}, { returnObjects: true });

  const FacebookMsg = dynamic(() => import('@components/compound/FacebookMsg')) as FC;

  const router = useRouter();

  const best_seller = products?.items.filter((item) => item.sold > 5);
  const sales = products?.items.filter((item) => item.percent_off);

  return (
    <KsLayout title="Home">
      <div className="kl-home">
        <section className="kl-home-slides">
          <>
            <Button
              className="action -left"
              iconOnly
              circle
              color="light"
              endAdornment={<i className="fa-light fa-chevron-left fa-xl icon" />}
            />
            <Swiper
              modules={[Pagination, Navigation, EffectFade, Autoplay]}
              loop
              allowTouchMove={false}
              navigation={{
                nextEl: '.kl-home-slides > .action.-right',
                prevEl: '.kl-home-slides > .action.-left',
              }}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
                waitForTransition: true,
              }}
              effect="fade"
              speed={1500}
              pagination={{
                clickable: true,
              }}
              className="swiper"
            >
              {SLIDES &&
                map(SLIDES, ({ image, listTitle, caption }, idx) => (
                  <SwiperSlide key={`home-slide-${idx}`}>
                    <Slide image={image} title={listTitle} caption={caption} />
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
          </>
        </section>

        <section className="kl-home-banners">
          <div className="kl-container content">
            <div className="wrapper">
              {map(banner, (banner: IHomeBanner, idx) => (
                <BannerCard
                  data={banner}
                  action={t('action')}
                  size="small"
                  key={`home-banner-${idx}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="kl-home-products">
          <div className="kl-container content">
            <div className="header">
              <h2 className="title">{t('best_seller.title')}</h2>
              <div className="readmore -bottom">
                <Link
                  href={routes.PRODUCTS}
                  className="action"
                  title=""
                  underline
                  color="primary"
                  rightIcon={<i className="fa-regular fa-chevron-right icon" />}
                >
                  {t('best_seller.action')}
                </Link>
              </div>
            </div>
            <ProductSlides products={best_seller || []} isLoading={isLoading} />
          </div>
        </section>

        {!isEmpty(sales) && (
          <section className="kl-home-products">
            <div className="kl-container content">
              <div className="header">
                <h2 className="title">On Sales</h2>
                <div className="readmore -bottom">
                  <Link
                    href={routes.PRODUCTS}
                    className="action"
                    title=""
                    underline
                    color="primary"
                    rightIcon={<i className="fa-regular fa-chevron-right icon" />}
                  >
                    {t('best_seller.action')}
                  </Link>
                </div>
              </div>
              <ProductSlides products={sales || []} isLoading={isLoading} />
            </div>
          </section>
        )}

        <section className="kl-home-testimonials">
          <div className="kl-container content">
            <div className="header">
              <h2 className="title">{t('testimonial.title')}</h2>
            </div>
            <Swiper
              breakpoints={{
                [breakpoints.xl]: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                [breakpoints.md]: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                [breakpoints.xs]: {
                  slidesPerView: 1,
                },
              }}
              modules={[Autoplay]}
              loop
              speed={700}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                waitForTransition: true,
              }}
              className="swiper"
            >
              {map(feedbacks?.data, ({ name, description, created_at }, idx) => (
                <SwiperSlide key={`testimonial-${idx}`}>
                  <Testimonial
                    name={name}
                    created_at={format(
                      parse(created_at, 'HH:mm:ss.SSSSSS', new Date()),
                      'dd/MM/yyyy',
                    )}
                    review={description.replaceAll('&#39;', "'")}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="kl-home-trailer">
          <span className="overlay" />
          <div className="content">
            <div className="info">
              <p className="heading">TAKE A trip</p>
              <h2 className="title">
                {t('trailer.first')} <br />
                {t('trailer.second')}
              </h2>

              <Button
                className="button"
                variant="outlined"
                onClick={() => router.push({ pathname: '/products/list' })}
                endAdornment={<i className="fa-solid fa-chevron-right icon" />}
              >
                {t('trailer.action')}
              </Button>
            </div>
          </div>
        </section>

        {/* <FacebookMsg /> */}
      </div>
    </KsLayout>
  );
};

export default Home;
