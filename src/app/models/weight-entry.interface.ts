export interface IWeightEntry {
    id?: number;
    trendWeight: number;
    weight: number;
    unit: 'imperial' | 'metric';
    date: string;
}
