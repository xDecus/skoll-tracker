import { TestBed } from '@angular/core/testing';
import { TrendWeightService } from './trend-weight.service';
import { WeightEntry } from '../models/weight-entry';
import { Title } from '@angular/platform-browser';

fdescribe('TrendWeightService', () => {
    let service: TrendWeightService;
    let ref: WeightEntry;
    let entries: WeightEntry[];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(TrendWeightService);
        entries = [];
        ref = {
            weight: 500,
            date: new Date(2018, 1, 25).toISOString(),
            trendWeight: 0,
            unit: 'metric'
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should calculate trend weight for a new entry of today', () => {
        getFakeData(20, entries);
        entries.push(ref);

        const workspace = entries.slice(0, service.daysUsedForCalculation);
        const avgWeight = avg(workspace);
        service.handleTrend(ref, entries);

        expect(ref.trendWeight).toBe(avgWeight);
    });

    it('should correctly handle trend weight for small amounts of entries', () => {
        getFakeData(3, entries);
        entries.push(ref);

        const avgWeight = avg(entries);
        service.handleTrend(ref, entries);

        expect(ref.trendWeight).toBe(avgWeight);
    });

    fit('should handle inserting values in the middle', () => {
        getFakeData(20, entries, 2);
        ref.date = new Date(2018, 0, 12).toISOString();
        entries.push(ref);

        service.handleTrend(ref, entries);
        console.log(entries);
    });

    it('should return future entries', () => {
        getFakeData(18, entries);
        console.log(entries);
        const result = (service as any).getRelevantEntries(9, entries, 10, 'future');
        expect(result[0].date).toBe(entries[9].date);
        expect(result[9].date).toBe(entries[0].date);
    });

    it('should return past entries', () => {
        getFakeData(19, entries);
        console.log(entries);
        const result = (service as any).getRelevantEntries(9, entries, 10, 'past');
        expect(result[0].date).toBe(entries[9].date);
        expect(result[9].date).toBe(entries[18].date);
    });
});

function getFakeData(amount: number, array: WeightEntry[], step = 1) {
    for (let i = 0; i < amount * step; i += step) {
        array.push({
            weight: i,
            date: new Date(2018, 0, i + 2).toISOString(),
            trendWeight: 0,
            unit: 'metric'
        });
    }
}

function avg(arr: WeightEntry[]) {
    return arr.map(entry => entry.weight).reduce((total, current) => total + current) / arr.length;
}
