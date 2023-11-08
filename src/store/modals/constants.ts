export interface defaultLightBoxState {
  defaultActive: number;
  images: string[];
}

interface ModalState {
  isOpen: boolean;
  lightBoxData: defaultLightBoxState;
  view?: keyof typeof MODALS;
}

export const MODALS = {
  WISHLIST: 'WISHLIST',
  LIGHT_BOX: 'LIGHT_BOX',
  TRAILER: 'TRAILER',
  CART: 'CART',
} as const;

export const defaultLightBoxData: defaultLightBoxState = { defaultActive: 0, images: [] };

export const initialState: ModalState = {
  isOpen: false,
  lightBoxData: defaultLightBoxData,
};
