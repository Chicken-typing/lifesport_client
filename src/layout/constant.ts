import { routes } from '@utils/routes';

interface IMenuList {
  label: string;
  route: string;
  submenu?: IMenuList[];
}

export const MENU_LIST: IMenuList[] = [
  {
    label: 'HOME',
    route: routes.HOME,
  },
  {
    label: 'ABOUT',
    route: routes.ABOUT,
  },
  {
    label: 'PRODUCT',
    route: routes.PRODUCTS,
    submenu: [
      {
        label: 'Sản phẩm làm đẹp',
        route: routes.PRODUCTS,
      },
      {
        label: 'Viêm Đường Hô Hấp - Đau họng - Ho - Viêm phổi',
        route: routes.PRODUCTS,
      },
      {
        label: 'Sản phẩm - Đau nhức cơ xương khớp',
        route: routes.PRODUCTS,
      },
      {
        label: 'Thảo dược xua đuổi côn trùng - Tâm linh tài lộc',
        route: routes.PRODUCTS,
      },
    ],
  },
  {
    label: 'BLOG',
    route: routes.BLOGS,
  },
  {
    label: 'CONTACT',
    route: routes.CONTACT,
  },
  {
    label: 'DISTRIBUTION',
    route: routes.DISTRIBUTION,
  },
];

export const MENU_BOTTOM = [
  {
    route: routes.PRODUCTS,
    className: 'fa-light fa-house',
    title: 'Shop',
  },
  {
    route: routes.AUTH,
    className: 'fa-regular fa-user',
    title: 'Account',
  },
  {
    route: '/',
    className: 'fa-regular fa-magnifying-glass',
    title: 'Search',
  },
  {
    route: routes.CART,
    className: 'fa-regular fa-heart',
    title: 'Wishlist',
  },
];

export const MENU_LANGUAGE = [
  {
    locale: 'en',
    name: 'English (en)',
  },
  {
    locale: 'vi',
    name: 'Vietnamese (vi) ',
  },
];
export const MENU_CURRENCY = [
  {
    icon: 'fa-regular fa-dollar-sign fa-sm _icon-hover',
    name: 'USD',
  },
  {
    icon: 'fa-regular fa-dong-sign fa-sm _icon-hover',
    name: 'VNĐ',
  },
];
export const ABOUT_LINKS = [
  {
    label: 'Giới thiệu',
    route: '/',
  },
  {
    label: 'Ý kiến khách hàng',
    route: '/',
  },
  {
    label: 'Liên hệ',
    route: '/',
  },
];

export const SHOP_LINKS = [
  {
    label: 'Sản phẩm sức khỏe',
    route: '/',
  },
  {
    label: 'Sản phẩm làm đẹp',
    route: '/',
  },
  {
    label: 'Nhang thảo dược',
    route: '/',
  },
  {
    label: 'Chương trình khuyến mãi',
    route: '/',
  },
];

export const HELP_CENTER_LINKS = [
  {
    label: 'Chính sách đổi trả',
    route: '/',
  },
  {
    label: 'Chính sách bảo mật',
    route: '/',
  },
  {
    label: 'Câu hỏi thường gặp',
    route: '/',
  },
];

export const CONTACT_LINKS = [
  {
    address: '1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, TP.HCM',
    phone1: '0932369776 ',
    phone2: '0559270701',
    web: 'lifetravel.vn',
  },
];

export const BRAND = [
  {
    className: 'fa-brands fa-facebook',
  },
  {
    className: 'fa-brands fa-twitter',
  },
  {
    className: 'fa-brands fa-linkedin',
  },
];

export const SERVICE = [
  {
    className: 'fa-light fa-dolly',
    title: 'Free Shipping',
    description: 'For the first order',
  },
  {
    className: 'fa-light fa-box-check',
    title: 'Return and exchange support',
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

export const CART = [
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 30,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_2_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_2_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 30,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_3_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_3_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 30,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_4_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_4_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_16_1.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_16_2.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 2,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_6_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_6_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_7_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_7_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_11_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_11_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 30,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_4_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_4_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_16_1.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_16_2.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 2,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_6_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_6_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_7_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_7_2-600x600.jpg',
    ],
  },
  {
    name: 'Cinnamon Horchata Organic Green and Black Tea',
    price: 50,
    rating: 4,
    discount: 50,
    count: 3,
    images: [
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_11_1-600x600.jpg',
      'https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/product_11_2-600x600.jpg',
    ],
  },
];
