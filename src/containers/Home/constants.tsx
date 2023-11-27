import FirstImage from '@svg/quantity/left-image.svg';
import SecondImage from '@svg/quantity/mid-image.svg';
import ThirdImage from '@svg/quantity/right-image.svg';

export const SLIDES = [
  {
    image: 'https://cdn.motor1.com/images/mgl/JJl4E/s1/rgnt-no.-1---scrambler---left-side.jpg',
    listTitle: 'RIDE AND LIVE TODAY',
    caption: 'We ride together anytime, anywhere.',
    color: 'light',
  },
  {
    image: '/images/home/slider_2.jpg',
    listTitle: ' The future is electric.',
    caption: 'Say goodbye to traffic, pollution, and parking nightmares – hello, e-motocycles.',
    color: 'light',
  },
  {
    image: '/images/home/slider_3.jpg',
    listTitle: 'Ride like a pro with the power of electricity',
    caption: 'E-motocycles – for a smarter, healthier, and more sustainable lifestyle.',
    color: 'light',
  },
];

export const COLLECTIONS = [
  {
    image: 'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/h1_cat-1.jpg',
    name: 'Cơ xương khớp',
  },
  {
    image: 'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/h1_cat-2.jpg',
    name: 'Cơ xương khớp',
  },
  {
    image: 'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/h1_cat-3.jpg',
    name: 'Cơ xương khớp',
  },
];

export interface IHomeBanner {
  image: string;
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'black' | 'white' | string;
}

export const QUANTITY = [
  {
    image: <FirstImage />,
    classNameIcon: 'icon',
    title: 'THÀNH LẬP NĂM 1983',
    name: 'GIẢI PHÁP CHĂM SÓC SỨC KHỎE',
    description:
      'Đai đeo thảo dược cao cấp phytobelt giải pháp chăm sóc vòng 2 cho phụ nữ sau sinh',
    link: 'Câu chuyện của chúng tôi',
  },
  {
    image: <SecondImage />,
    classNameIcon: 'icon -right',
    title: 'CHẤT LƯỢNG',
    name: 'ĐIỀU TRỊ AN TOÀN',
    description: 'Thoát vị đĩa đệm cột sống cổ, các vấn đề cần biết',
    link: 'Y khoa thưởng thức',
  },
  {
    image: <ThirdImage />,
    classNameIcon: 'icon',
    title: 'TỰ NHIÊN & TINH KHIẾT',
    name: 'NGUY CƠ KHÁNG THUỐC',
    description:
      'Giải pháp phòng bệnh và khắc phục tình trạng kháng thuốc bằng thảo dược thiên nhiên an toàn ',
    link: 'Giải pháp của chúng tôi',
  },
];

export const TESTIMONIALS = [
  {
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/359130674_256750947103120_6706656947179994557_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=WIc5h8N2qaoAX_UdywD&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAt8STsyIb28eEum7aN1b3e8WoR3UYu5Re8tEDeoCzU5w&oe=64B4959B',
    name: 'Ngọc Tùng',
    province: 'Lâm Đồng',
    city: 'Đà Lạt',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum facilisis tellus, sed consectetur purus maximus a. Cras ac iaculis nulla, at blandit elit. Vivamus aliquam metus non nibh pellentesque varius. Vestibulum aliquet magna lacus. Etiam placerat ultricies magna et sodales..',
  },
  {
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/359130674_256750947103120_6706656947179994557_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=WIc5h8N2qaoAX_UdywD&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAt8STsyIb28eEum7aN1b3e8WoR3UYu5Re8tEDeoCzU5w&oe=64B4959B',
    name: 'Thanh Mai',
    city: 'HCM',
    district: 'Quận 11',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum facilisis tellus, sed consectetur purus maximus a. Cras ac iaculis nulla, at blandit elit. Vivamus aliquam metus non nibh pellentesque varius. Vestibulum aliquet magna lacus. Etiam placerat ultricies magna et sodales.',
  },
  {
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/359130674_256750947103120_6706656947179994557_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=WIc5h8N2qaoAX_UdywD&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAt8STsyIb28eEum7aN1b3e8WoR3UYu5Re8tEDeoCzU5w&oe=64B4959B',
    name: 'Phạm Ngọc Hương',
    city: 'HCM',
    district: 'Bình Chánh',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum facilisis tellus, sed consectetur purus maximus a. Cras ac iaculis nulla, at blandit elit. Vivamus aliquam metus non nibh pellentesque varius. Vestibulum aliquet magna lacus. Etiam placerat ultricies magna et sodales. ',
  },
  {
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/359130674_256750947103120_6706656947179994557_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=WIc5h8N2qaoAX_UdywD&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAt8STsyIb28eEum7aN1b3e8WoR3UYu5Re8tEDeoCzU5w&oe=64B4959B',
    name: 'Tuấn Hùng',
    city: 'HCM',
    district: 'Gò Vấp',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum facilisis tellus, sed consectetur purus maximus a. Cras ac iaculis nulla, at blandit elit. Vivamus aliquam metus non nibh pellentesque varius. Vestibulum aliquet magna lacus. Etiam placerat ultricies magna et sodales. ',
  },
  {
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/359130674_256750947103120_6706656947179994557_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=WIc5h8N2qaoAX_UdywD&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAt8STsyIb28eEum7aN1b3e8WoR3UYu5Re8tEDeoCzU5w&oe=64B4959B',
    name: 'Ngọc Tùng',
    province: 'Lâm Đồng',
    city: 'Đà Lạt',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum facilisis tellus, sed consectetur purus maximus a. Cras ac iaculis nulla, at blandit elit. Vivamus aliquam metus non nibh pellentesque varius. Vestibulum aliquet magna lacus. Etiam placerat ultricies magna et sodales.',
  },
  {
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/359130674_256750947103120_6706656947179994557_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=WIc5h8N2qaoAX_UdywD&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAt8STsyIb28eEum7aN1b3e8WoR3UYu5Re8tEDeoCzU5w&oe=64B4959B',
    name: 'Ngọc Tùng',
    province: 'Lâm Đồng',
    city: 'Đà Lạt',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum facilisis tellus, sed consectetur purus maximus a. Cras ac iaculis nulla, at blandit elit. Vivamus aliquam metus non nibh pellentesque varius. Vestibulum aliquet magna lacus. Etiam placerat ultricies magna et sodales..',
  },
  {
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/359130674_256750947103120_6706656947179994557_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=WIc5h8N2qaoAX_UdywD&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAt8STsyIb28eEum7aN1b3e8WoR3UYu5Re8tEDeoCzU5w&oe=64B4959B',
    name: 'Ngọc Tùng',
    province: 'Lâm Đồng',
    city: 'Đà Lạt',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum facilisis tellus, sed consectetur purus maximus a. Cras ac iaculis nulla, at blandit elit. Vivamus aliquam metus non nibh pellentesque varius. Vestibulum aliquet magna lacus. Etiam placerat ultricies magna et sodales.',
  },
];

export const BLOGS = [
  {
    id: 'id',
    categoryId: 'categoryID',
    storeId: 'storeId',
    name: 'CaoCao xoa bóp thảo dược đông yyyyyyyyCao xoa bóp thảo dược đông yyyyyyyyCao xoa bóp thảo dược đông yyyyyyyy xoa bóp thảo dược đông yyyyyyyy',
    description: 'description',
    slug: 'slug',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_2-820x801.jpg'],
    tags: ['SỨC KHỎE'],
    createdAt: '11/11/2023',
    content: 'content',
  },
  {
    id: 'id2',
    categoryId:
      'categoryID2 categoryID2categoryID2categoryID2 categoryID2 categoryID2categoryID2 categoryID2categoryID2',
    storeId: 'storeId2',
    name: 'Các sản phẩm đang có chương trình khuyến mãi',
    description: 'description2',
    slug: 'slug2',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_9-820x750.jpg'],
    tags: ['KHUYẾN MÃI'],
    createdAt: '11/11/2023',
    content: 'content2',
  },
  {
    id: 'id',
    categoryId: 'categoryID',
    storeId: 'storeId',
    name: 'Mẹ bỉm sữa giảm mỡ bụng sau sinh',
    description: 'description',
    slug: 'slug',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_3-820x750.jpg'],
    tags: ['LÀM ĐẸP'],
    createdAt: '11/11/2023',
    content: 'content',
  },
  {
    id: 'id2',
    categoryId: 'categoryID2',
    storeId: 'storeId2',
    name: 'Nhang sạch thảo dược thiên nhiên không hóa chất',
    description: 'description2',
    slug: 'slug2',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_7-820x800.jpg'],
    tags: ['SỨC KHỎE'],
    createdAt: '11/11/2023',
    content: 'content2',
  },
  {
    id: 'id',
    categoryId: 'categoryID',
    storeId: 'storeId',
    name: 'Cao xoa bóp thảo dược đông y',
    description: 'description',
    slug: 'slug',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_2-820x801.jpg'],
    tags: ['SỨC KHỎE'],
    createdAt: '11/11/2023',
    content: 'content',
  },
  {
    id: 'id2',
    categoryId:
      'categoryID2 categoryID2categoryID2categoryID2 categoryID2 categoryID2categoryID2 categoryID2categoryID2',
    storeId: 'storeId2',
    name: 'Các sản phẩm đang có chương trình khuyến mãi',
    description: 'description2',
    slug: 'slug2',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_9-820x750.jpg'],
    tags: ['KHUYẾN MÃI'],
    createdAt: '11/11/2023',
    content: 'content2',
  },
  {
    id: 'id',
    categoryId: 'categoryID',
    storeId: 'storeId',
    name: 'Mẹ bỉm sữa giảm mỡ bụng sau sinh',
    description: 'description',
    slug: 'slug',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_3-820x750.jpg'],
    tags: ['LÀM ĐẸP'],
    createdAt: '11/11/2023',
    content: 'content',
  },
  {
    id: 'id2',
    categoryId: 'categoryID2',
    storeId: 'storeId2',
    name: 'Nhang sạch thảo dược thiên nhiên không hóa chất',
    description: 'description2',
    slug: 'slug2',
    images: ['https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog_7-820x800.jpg'],
    tags: ['SỨC KHỎE'],
    createdAt: '11/11/2023',
    content: 'content2',
  },
];

export const PRODUCTS = [
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    id: 'id',
    rating: 4,
    discount: 30,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_2_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_2_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    id: 'id',
    rating: 4,
    discount: 30,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_3_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_3_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    id: 'id',
    rating: 4,
    discount: 30,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_4_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_4_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    id: 'id',
    rating: 4,
    discount: 50,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_16_1.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_16_2.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    id: 'id',
    rating: 4,
    discount: 50,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_6_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_6_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    id: 'id',
    rating: 4,
    discount: 50,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_7_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_7_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    id: 'id',
    rating: 4,
    discount: 50,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_11_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_11_2-600x600.jpg',
    ],
  },
];

export const SERVICE = [
  {
    className: 'fa-light fa-dolly',
    title: 'Miễn Phí Vận Chuyển',
    description: 'Đơn hàng trên 1 triệu đồng',
  },
  {
    className: 'fa-light fa-box-check',
    title: 'Hỗ trợ đổi trả',
    description: 'Lỗi do nhà sẳn suất',
  },
  {
    className: 'fa-light fa-headphones',
    title: 'Hỗ trợ 24/7',
    description: '0286.688.7979 / 0906.861.663',
  },
  {
    className: 'fa-light fa-money-check',
    title: 'Thanh Toán Linh Hoạt ',
    description: 'Tùy bạn lựa chọn',
  },
];
