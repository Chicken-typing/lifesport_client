// import { FC } from 'react';
// import { BlogCard } from '../BlogCard';
// import { map } from 'lodash';
// import { SwiperSlide, Swiper } from 'swiper/react';
// import { Autoplay } from 'swiper';
// import { breakpoints } from '@/utils/constants';
// import { IBlog } from '@interfaces/blog';

// interface IBlogSlideProps {
//   blogs: IBlog[];
// }

// export const BlogSlide: FC<IBlogSlideProps> = ({ blogs }) => {
//   return (
//     <div className="kl-blog-slide">
//       <Swiper
//         breakpoints={{
//           [breakpoints.sm]: {
//             slidesPerView: 1.5,
//             spaceBetween: 15,
//           },
//           [breakpoints.md]: {
//             slidesPerView: 2,
//             spaceBetween: 15,
//           },
//           [breakpoints.lg]: {
//             slidesPerView: 3,
//             spaceBetween: 20,
//           },
//           [breakpoints.xl]: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//           },
//         }}
//         pagination={{
//           clickable: false,
//         }}
//         className="swiper"
//       >
//         {map(blogs, (it, idx) => (
//           <SwiperSlide key={`blog-slide-${idx}`}>
//             <BlogCard data={it} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };
import React from 'react';

export default function BlogSlide() {
  return <div>index</div>;
}
