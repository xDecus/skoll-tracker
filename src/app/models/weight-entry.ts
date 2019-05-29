import { IWeightEntry } from './weight-entry.interface';

export class WeightEntry implements IWeightEntry {
    id?: number;
    trendWeight: number;
    weight: number;
    unit: 'imperial' | 'metric';
    date: string;

    constructor(
        weight: number,
        trendWeight: number,
        unit: 'imperial' | 'metric',
        date: string,
        id?: number
    ) {
        this.weight = weight;
        this.trendWeight = trendWeight;
        this.unit = unit;
        this.date = date;
        if (id) {
            this.id = id;
        }
    }
}
