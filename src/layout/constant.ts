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

export const BRAND = [
  {
    className: 'fa-brands fa-facebook',
  },
];
