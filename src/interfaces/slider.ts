export interface ISlider {
  id: string;
  page: string;
  place: number;
  name: string;
  items: {
    priority: number;
    title: string;
    description: string;
    image: string;
    buttons: {
      title: string;
      link: string;
    }[];
  }[];
}
