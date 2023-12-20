export interface IProduct {
  rating?: string;
  id: number;
  appId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string[];
  images: string[];
  videos: string[];
  price: number;
  categoryId: string;
  inventoryId: string;
  options: IOption[];
  attributes: IAttribute[];
  discount: number;
  discountRate: number;
  quantity: number;
  sort: number;
  sold: number;
  sku: string;
  isPreOrder: boolean;
  isUsed: boolean;
  status: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  likeNum: number;
  viewNum: number;
  brand: string;
  sale_off: number;
  percent_off?: number;
  amount_off?: number;
  quantityCart?: number;
  color: string[];
  avg_rate: string;
  comments: IComment[];
}

export interface IComment {
  rate: number;
  comment?: string;
  user_name: string;
  created_at: string;
}
export interface IProductDetail {
  item: [
    {
      rating: number;
      id: string;
      appId: string;
      name: string;
      slug: string;
      description: string;
      shortDescription: string;
      thumbnail: string[];
      images: string[];
      videos: string[];
      price: number;
      categoryId: string;
      inventoryId: string;
      options: IOption[];
      attributes: IAttribute[];
      discount: number;
      discountRate: number;
      quantity: number;
      sort: number;
      sold: number;
      sku: string;
      isPreOrder: boolean;
      isUsed: boolean;
      status: number;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      likeNum: number;
      viewNum: number;
      quantityCart?: number;
    },
  ];
}
export interface IAttribute {
  name: string;
  option1: string;
  option2: string;
  quantity: number;
  sold: number;
  price: number;
  groupPrice: number;
}

export interface IOption {
  code: string;
  name: string;
  images?: string[];
  values: {
    value: string;
    image: string;
  }[];
}
