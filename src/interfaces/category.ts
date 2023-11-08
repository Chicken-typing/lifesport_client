export interface ICategory {
  id: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  parentId?: string;
  parentName?: string;
  children?: ICategory[];
}
