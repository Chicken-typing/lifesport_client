// import { KaImage, Link } from '@components/primitive';
// import { IBlog } from '@interfaces/blog';
// import { map } from 'lodash';
// import { FC } from 'react';
// import { routes } from '@utils/routes';

// interface IBlogCardProps {
//   data: IBlog;
// }

// export const BlogCard: FC<IBlogCardProps> = ({ data }) => {
//   const { name, thumbnail, tags, id } = data;

//   return (
//     <div className="kl-blog-card">
//       <div className="thumbnail">
//         <Link
//           className="tag"
//           href={{
//             pathname: routes.BLOG,
//             query: {
//               slug: id,
//             },
//           }}
//           title={name}
//         >
//           <KaImage src={thumbnail} alt={name} objectFit="cover" className="image" ratio="square" />
//         </Link>
//       </div>

//       <div className="content">
//         <div className="meta">
//           {map(tags, ({ name, id }, idx) => (
//             <span className="text" key={idx}>
//               {idx > 0 && ' & '}
//               <Link
//                 className="tag"
//                 href={{
//                   pathname: routes.BLOGS,
//                   query: {
//                     tag: id,
//                   },
//                 }}
//                 title={name}
//                 size="xs"
//                 color="primary"
//               >
//                 {name}
//               </Link>
//             </span>
//           ))}
//         </div>

//         <Link
//           className="name"
//           href={{
//             pathname: routes.BLOG,
//             query: {
//               slug: id,
//             },
//           }}
//           size="lg"
//           title=""
//           color="secondary"
//         >
//           {name}
//         </Link>
//       </div>

//       <div className="more">
//         <Link
//           href={{
//             pathname: routes.BLOG,
//             query: {
//               slug: id,
//             },
//           }}
//           className="link"
//           size="sm"
//           color="black"
//           underline
//           title={name}
//           rightIcon={<i className="fa-regular fa-chevron-right icon" />}
//         >
//           Đọc tiếp
//         </Link>
//       </div>
//     </div>
//   );
// };
import React from 'react';

export const BlogCard = () => {
  return <div>index</div>;
};
