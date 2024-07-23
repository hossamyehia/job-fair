import { IChartDataset } from "./IChartDataset.model";

export interface IChartData{
    labels: string[],
    datasets: IChartDataset[];
}