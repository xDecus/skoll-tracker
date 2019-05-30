import { Injectable } from '@angular/core';
import { WeightEntry } from '../models/weight-entry';

@Injectable({
    providedIn: 'root'
})
export class TrendWeightService {
    private daysUsedForCalculation = 10;

    constructor() {}

    handleTrend(reference: WeightEntry, items: WeightEntry[]) {
        const ix = items.indexOf(reference);
        // First, let's handle the case where this is actually the newest entry
        // In that case, the trendWeight of this entry
        if (ix === items.length - 1) {
            // Starting at the newest entry, iterate through the last 10 or as many as are in the array

            const weights: number[] = [];
            for (
                let i = items.length - 1;
                i >= 0 && i > items.length - 1 - this.daysUsedForCalculation;
                i--
            ) {
                weights.push(items[i].weight);
            }
            reference.trendWeight =
                weights.reduce((total, current) => total + current) / weights.length;
        }
    }

    sortByDate(x: string, y: string) {
        return new Date(x).getTime() - new Date(y).getTime();
    }
}
