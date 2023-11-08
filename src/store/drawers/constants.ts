interface DrawerState {
  isOpen: boolean;
  view?: keyof typeof DRAWERS;
  anchor?: keyof typeof ANCHORS;
}

export const DRAWERS = {
  HEADER: 'HEADER',
  PRODUCT: 'PRODUCT',
  BLOG: 'BLOG',
  CART: 'CART',
} as const;

export const ANCHORS = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
} as const;

export const initialState: DrawerState = {
  isOpen: false,
  anchor: ANCHORS.left,
};
