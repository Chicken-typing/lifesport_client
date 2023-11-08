// export const $ = document.querySelector.bind(document);
// export const $$ = document.querySelectorAll.bind(document);

export const defaultImages = {
  ERROR: '/images/error.png',
};

export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
} as const;

export const storeId = process.env.NEXT_PUBLIC_STORE_ID;
