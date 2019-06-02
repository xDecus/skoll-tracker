import { Injectable } from '@angular/core';
import { WeightEntry } from '../models/weight-entry';

@Injectable({
    providedIn: 'root'
})
export class TrendWeightService {
    public daysUsedForCalculation = 10;

    constructor() {}

    handleTrend(reference: WeightEntry, items: WeightEntry[]) {
        items.sort((a, b) => this.sortByDate(a.date, b.date));
        const referenceIndex = items.indexOf(reference);
        // First, let's handle the case where this is the oldest entry
        // in since there's no ancestors, its trendWeight is its weight
        if (referenceIndex === items.length - 1) {
            reference.trendWeight = reference.weight;
            return;
        }
        // Then, let's handle the newest entry
        if (referenceIndex === 0) {
            const entries = this.getRelevantEntries(
                referenceIndex,
                items,
                this.daysUsedForCalculation
            );
            reference.trendWeight = this.calculateAverage(entries);
        } else {
            // Else, the reference is somewhere else in the array.
            // In that case we'll get us an array that contains the reference
            // and its trend dependants (the entries that use it for their trend calculation)
            const entries = this.getRelevantEntries(
                referenceIndex,
                items,
                this.daysUsedForCalculation,
                'future'
            );
            // Then we recalculate each entry's trend weight by passing it into this func
            entries.forEach(entry => {
                const relevant = this.getRelevantEntries(
                    entries.indexOf(entry),
                    entries,
                    this.daysUsedForCalculation
                );
                this.handleTrend(relevant[0], relevant);
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
        return (
            entries.map(entry => entry.weight).reduce((total, current) => total + current) /
            entries.length
        );
    }
}
