export interface IDistribution_District {
  name: string;
  branchs: string[];
}
export interface IDistribution {
  province: string;
  districts: IDistribution_District[];
}
