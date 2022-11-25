export interface ISub {
  id: number;
  period_end: string;
  period_start: string;
  title?: string
  sub?: ISub[]
}

export interface IData {
  period: string;
  project: string;
  chart: {
    id: number;
    period_end: string;
    period_start: string;
    sub: ISub[]
  }
}
