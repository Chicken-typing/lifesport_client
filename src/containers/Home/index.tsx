import KsLayout from '@/layout';
import { useBlogsQuery } from '@/query/blogs/getBlogs';
import { useProductCategoriesQuery } from '@/query/productCategories/getProductCategories';
import { useProductsQuery } from '@/query/products/get-products';
import { useSlidersQuery } from '@/query/sliders/getSliders';
import { getCartList } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { breakpoints } from '@/utils/constants';
import { routes } from '@/utils/routes';
import { BlogSlide, ProductSlides } from '@components/compound';
import { Button, KaImage, Link } from '@components/primitive';
import { Skeleton } from '@mui/material';
import { LIMIT } from '@utils/limit';
import { map, slice, times, isEmpty } from 'lodash';
import { useEffect } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import BannerCard from './BannerCard';
import { BANNERS, QUANTITY, TESTIMONIALS, SLIDES } from './constants';
import Slide from './Slide';
import Testimonial from './Testimonial';
import request from '@utils/request';

const Home = () => {
  const { data: products } = useProductsQuery({ limit: 10 });
  const { data: blogs } = useBlogsQuery({ limit: LIMIT.HOME_BLOGS, page: 1 });
  const { data: categories, isLoading: isLoadingCategories } = useProductCategoriesQuery({
    limit: LIMIT.HOME_COLLECTIONS,
    page: 1,
  });

  console.log('products', products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const cart = localStorage.getItem('carts');
    if (cart) {
      dispatch(getCartList(JSON.parse(cart)));
    }
  });

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
              {map(BANNERS, (banner, idx) => (
                <BannerCard
                  data={banner}
                  action="Mua ngay"
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
              <h2 className="title">Best Seller</h2>
              <div className="readmore -bottom">
                <Link
                  href={routes.PRODUCTS}
                  className="action"
                  title=""
                  underline
                  color="primary"
                  rightIcon={<i className="fa-regular fa-chevron-right icon" />}
                >
                  Read more
                </Link>
              </div>
            </div>
            <ProductSlides products={products?.items || []} />
          </div>
        </section>

        <section className="kl-home-collections">
          <div className="kl-container content">
            <h2 className="title">Collection</h2>

            <div className="grid">
              {isLoadingCategories
                ? times(LIMIT.HOME_COLLECTIONS, (idx) => (
                    <div className="card" key={`collection-${idx}`}>
                      <div className="kl-home-collection">
                        <div className="link" />
                      </div>
                    </div>
                  ))
                : map(slice(categories, 0, LIMIT.HOME_COLLECTIONS), ({ id, name, image }) => (
                    <div className="card" key={`collection-${id}`}>
                      <div className="kl-home-collection">
                        <Link
                          className="link"
                          href={{
                            pathname: routes.PRODUCTS,
                            query: {
                              category: `${name}-${id}`,
                            },
                          }}
                          title={name}
                        >
                          <KaImage
                            src={!isEmpty(image) ? image : ''}
                            alt={!isEmpty(image) ? image : ''}
                            objectFit="cover"
                            className="image"
                            ratio="square"
                          />
                        </Link>

                        <div className="container">
                          <Link
                            href={{
                              pathname: routes.PRODUCTS,
                              query: {
                                category: `${name}-${id}`,
                              },
                            }}
                            className="title"
                            color="white"
                            size="lg"
                            title={name}
                          >
                            {name}
                          </Link>

                          <Link
                            href={{
                              pathname: routes.PRODUCTS,
                              query: {
                                category: `${name}-${id}`,
                              },
                            }}
                            title={name}
                            className="link"
                            size="sm"
                            color="white"
                            rightIcon={<i className="fa-regular fa-chevron-right icon" />}
                          >
                            Mua ngay
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* <section className="kl-home-quantity">
          <div className="kl-container content">
            {map(QUANTITY, (item, idx) => (
              <div key={`quantity-${idx}`} className="quantity">
                <div className="image">
                  <div className={item.classNameIcon}>{item.image}</div>
                </div>
                <div className="title">{item.title}</div>
                <div className="name">{item.name}</div>
                <div className="description">{item.description}</div>
                <Link
                  className="link"
                  href="/"
                  title=""
                  rightIcon={<i className="fa-solid fa-chevron-right fa-xs icon" />}
                  underline
                  color="black"
                  size="sm"
                >
                  {item.link}
                </Link>
              </div>
            ))}
          </div>
        </section> */}

        <section className="kl-home-testimonials">
          <div className="kl-container content">
            <div className="header">
              <h2 className="title">Ý kiến khách hàng</h2>
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
              {map(TESTIMONIALS, ({ image, name, province, city, district, review }, idx) => (
                <SwiperSlide key={`testimonial-${idx}`}>
                  <Testimonial
                    image={image}
                    name={name}
                    province={province}
                    city={city}
                    district={district}
                    review={review}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {blogs?.items.length !== 0 && (
          <section className="kl-home-blogs">
            <div className="kl-container content">
              <div className="header">
                <h2 className="title">TIN MỚI NHẤT</h2>
                <div className="viewmore -bottom">
                  <Link
                    href="/"
                    className="action"
                    title=""
                    underline
                    color="primary"
                    rightIcon={<i className="fa-regular fa-chevron-right icon" />}
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>

              <BlogSlide blogs={blogs?.items || []} />
            </div>
          </section>
        )}

        <section className="kl-home-trailer">
          <span className="overlay" />
          <div className="content">
            <div className="info">
              <p className="heading">TAKE A trip</p>
              <h2 className="title">
                Vì môi trường trong sạch <br />
                Hạn chế ô nhiễm khói bụi
              </h2>
              {/* <ul className="description">
                <li className="item">** Phục hồi chức năng vận động do tai biến mạch máu não **</li>
                <li className="item">** Gai cột sóng, thoát vị đĩa đệm, thoái hóa đốt sống **</li>
                <li className="item">** Đau vai cổ gáy, thần kinh tọa, tê bì chân tay **</li>
              </ul> */}
              <Button
                className="button"
                variant="outlined"
                endAdornment={<i className="fa-solid fa-chevron-right icon" />}
              >
                Xem tất cả sản phẩm
              </Button>
            </div>
          </div>
        </section>
      </div>
    </KsLayout>
  );
};

export default Home;
