export interface IBlog {
  id: string;
  appId: string;
  name: string;
  slug: string;
  thumbnail: string;
  status?: 'published';
  isEnableComment: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  authorId?: string;
  likedNum?: number;
  catgory: {
    id: string;
    name: string;
    slug: string;
  };
  author: {
    id: string;
    firstname: string;
    lastName: string;
    username: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface IDetailBlog extends IBlog {
  content: string;
}
