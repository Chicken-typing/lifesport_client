export interface IAnyObject {
  [key: string]: any;
}

export interface IQueryOptionsList {
  page?: number;
  limit?: number;
}

export interface IQueryResultList<T> {
  items: T[];
  total: number;
}

export interface IQueryResultDetail<T> {
  item: T[];
}

export interface IQueryResultDetail<T> {
  items: T[];
}

export interface IQueryResultDetail<T> {
  data: T;
}

export interface IQueryResultStatistics {
  status: string;
  data: [
    {
      revenue: string;
      revenue_interval: string;
    },
  ];
}
