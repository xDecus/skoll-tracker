import { TestBed } from '@angular/core/testing';
import { TrendWeightService } from './trend-weight.service';
import { WeightEntry } from '../models/weight-entry';

describe('TrendWeightService', () => {
    let service: TrendWeightService;
    let ref: WeightEntry;
    let entries: WeightEntry[];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(TrendWeightService);
        entries = [];
        ref = {
            weight: 210,
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
        entries.sort((x, y) => service.sortByDate(x.date, y.date));
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

    it('should handle inserting values in the middle', () => {
        getFakeData(21, entries);
        const r = entries.find(e => e.weight === 210);
        service.handleTrend(r, entries);
        console.log(entries);
        expect(entries[0].trendWeight).toBe(255);
        expect(entries[1].trendWeight).toBe(245);
        expect(entries[2].trendWeight).toBe(235);
        expect(entries[3].trendWeight).toBe(225);
        expect(entries[4].trendWeight).toBe(215);
        expect(entries[5].trendWeight).toBe(205);
        expect(entries[6].trendWeight).toBe(195);
        expect(entries[7].trendWeight).toBe(185);
        expect(entries[8].trendWeight).toBe(175);
        expect(entries[9].trendWeight).toBe(165);
    });

    it('should return future entries', () => {
        getFakeData(18, entries);
        const result = (service as any).getRelevantEntries(9, entries, 10, 'future');
        expect(result[0].date).toBe(entries[9].date);
        expect(result[9].date).toBe(entries[0].date);
    });

    it('should return past entries', () => {
        getFakeData(19, entries);
        const result = (service as any).getRelevantEntries(9, entries, 10, 'past');
        expect(result[0].date).toBe(entries[9].date);
        expect(result[9].date).toBe(entries[18].date);
    });

    it('should sort by date with the newest one first', () => {
        getFakeData(10, entries);
        entries.sort((x, y) => service.sortByDate(x.date, y.date));
        expect(entries[0].date).toBe(new Date(2018, 0, 11).toISOString());
    });
});

function getFakeData(amount: number, array: WeightEntry[]) {
    for (let i = 0; i < amount; i++) {
        array.push({
            weight: 100 + 10 * i,
            date: new Date(2018, 0, i + 2).toISOString(),
            trendWeight: 0,
            unit: 'metric'
        });
    }
}

function avg(arr: WeightEntry[]) {
    return (
        Math.round(
            (arr.map(entry => entry.weight).reduce((total, current) => total + current) /
                arr.length) *
                10
        ) / 10
    );
}
