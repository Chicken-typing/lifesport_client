import { routes } from '@utils/routes';

interface IMenuList {
  label: string;
  route: string;
  submenu?: IMenuList[];
}

export const MENU_LIST: IMenuList[] = [
  {
    label: 'Trang chủ',
    route: routes.HOME,
  },
  {
    label: 'Giới thiệu',
    route: routes.ABOUT,
  },
  {
    label: 'Sản phẩm',
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
    label: 'Tin tức',
    route: routes.BLOGS,
  },
  {
    label: 'Liên hệ',
    route: routes.CONTACT,
  },
  {
    label: 'Hệ thống phân phối',
    route: routes.DISTRIBUTION,
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

export const TEA_TYPE = [
  {
    label: 'Black',
    value: 'black',
    count: 10,
  },
  {
    label: 'Green',
    value: 'green',
    count: 7,
  },
  {
    label: 'Herbal',
    value: 'herbal',
    count: 9,
  },
  {
    label: 'Matcha',
    value: 'matcha',
    count: 4,
  },
  {
    label: 'Oolong',
    value: 'oolong',
    count: 6,
  },
  {
    label: 'White',
    value: 'white',
    count: 7,
  },
];

export const INGREDIENTS = [
  {
    label: 'Apple',
    value: 'apple',
    count: 10,
  },
  {
    label: 'Banana',
    value: 'banana',
    count: 8,
  },
  {
    label: 'Cacao',
    value: 'cacao',
    count: 5,
  },
  {
    label: 'Chamomile',
    value: 'chamonile',
    count: 7,
  },
  {
    label: 'Chocolate',
    value: 'chocolate',
    count: 4,
  },
  {
    label: 'Coconut',
    value: 'coconut',
    count: 6,
  },
  {
    label: 'Lemon',
    value: 'lemon',
    count: 7,
  },
  {
    label: 'Mango',
    value: 'mango',
    count: 7,
  },
  {
    label: 'Orange',
    value: 'orange',
    count: 8,
  },
  {
    label: 'Vanilla',
    value: 'vanilla',
    count: 6,
  },
];

export const RATING = [
  {
    value: 5,
    count: 69,
  },
  {
    value: 4,
    count: 14,
  },
  {
    value: 3,
    count: 8,
  },
  {
    value: 2,
    count: 7,
  },
  {
    value: 1,
    count: 2,
  },
];

export const POPULAR_TAGS = ['Beverage', 'HerbalTea', 'Hot Drink', 'Tea Culture'];
