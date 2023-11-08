export interface IBanner {
  page: string;
  place: number;
  priority: number;
  title: string;
  subTitle: string;
  description: string;
  link: string;
  imagePc: string;
  imageSp: string;
  buttons: {
    title: string;
    link: string;
  }[];
}
