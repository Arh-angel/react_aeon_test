export interface IData {
  project: string,
  period: string,
  chart: {
    id: number,
    title: string,
    period_start: string,
    period_end: string,
    sub: [{
      id: number,
      title: string,
      period_start: string,
      period_end: string,
    }]
  }
}
