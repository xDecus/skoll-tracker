import { Injectable } from '@angular/core';
import { WeightEntry } from '../models/weight-entry';

@Injectable({
    providedIn: 'root'
})
export class TrendWeightService {
    public daysUsedForCalculation = 10;

    constructor() {}

    handleTrend(reference: WeightEntry, items: WeightEntry[]) {
        // First, sort the entries we're getting so that index 0 is the most current date
        items.sort((a, b) => this.sortByDate(a.date, b.date));
        const referenceIndex = items.indexOf(reference);

        console.log(items);
        console.log(referenceIndex);
        // If the referenceIndex is 0, that means we can simpy calculate the trend weight for this entry
        if (referenceIndex === 0) {
            const relevantEntries = this.getRelevantEntries(
                referenceIndex,
                items,
                this.daysUsedForCalculation
            );
            console.log(relevantEntries);
            reference.trendWeight = this.calculateAverage(relevantEntries);
        } else {
            // Otherwise, we added a new reference somewhere in the middle
            // This means we need to iterate over the entries that are affected by this entry
            const affectedEntries = this.getRelevantEntries(
                referenceIndex,
                items,
                this.daysUsedForCalculation,
                'future'
            );
            affectedEntries.forEach(entry => {
                const x = this.getRelevantEntries(
                    items.indexOf(entry),
                    items,
                    this.daysUsedForCalculation
                );
                this.handleTrend(entry, x);
            });
        }
    }

    /**
     * Recalculates the trend weights of the entire given array
     */
    public recalculateTrends(items: WeightEntry[]) {
        for (let i = items.length - 1; i >= 0; i--) {
            this.handleTrend(items[i], items);
        }
    }

    /**
     * Can be used to sort an array by date, based on iso strings.
     * * Sorts descending, with the newest date coming first
     * @param x An ISO date string
     * @param y An ISO date string
     */
    public sortByDate(x: string, y: string): number {
        return new Date(y).getTime() - new Date(x).getTime();
    }

    private getRelevantEntries(
        referenceIndex: number,
        all: WeightEntry[],
        daysUsedForCalculation: number,
        direction: 'past' | 'future' = 'past'
    ): WeightEntry[] {
        const entries: WeightEntry[] = [];
        switch (direction) {
            case 'future':
                {
                    for (
                        let i = referenceIndex;
                        i >= 0 && i > referenceIndex - daysUsedForCalculation;
                        i--
                    ) {
                        entries.push(all[i]);
                    }
                }
                break;
            case 'past':
                {
                    for (
                        let i = referenceIndex;
                        i < all.length && i < referenceIndex + daysUsedForCalculation;
                        i++
                    ) {
                        entries.push(all[i]);
                    }
                }
                break;
        }

        return entries;
    }

    private calculateAverage(entries: WeightEntry[]): number {
        const avg =
            entries.map(entry => entry.weight).reduce((total, current) => total + current) /
            entries.length;
        console.log(avg);
        return Math.round(avg * 10) / 10;
    }
}
