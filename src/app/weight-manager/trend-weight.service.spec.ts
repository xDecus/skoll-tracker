import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { TrendWeightService } from './trend-weight.service';
import { WeightEntry } from '../models/weight-entry';

describe('TrendWeightService', () => {
    let service: TrendWeightService;
    const ref: WeightEntry = {
        weight: faker.random.number({ min: 80, max: 90 }),
        date: new Date(2018, 0, 31).toISOString(),
        trendWeight: 0,
        unit: 'metric'
    };
    let entries: WeightEntry[];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(TrendWeightService);
        entries = [];
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should calculate trend weight for a new entry of today', () => {
        getFakeData(20, entries);
        entries.push(ref);
        entries.sort((a, b) => service.sortByDate(a.date, b.date));

        const workspace = entries.slice(entries.length - 10);
        const avgWeight = workspace.map(a => a.weight).reduce((a, b) => a + b) / workspace.length;
        service.handleTrend(ref, entries);

        expect(ref.trendWeight).toBe(avgWeight);
    });

    it('should correctly handle trend weight for small amounts of entries', () => {
        getFakeData(3, entries);
        entries.push(ref);
        entries.sort((a, b) => service.sortByDate(a.date, b.date));

        const avgWeight = entries.map(a => a.weight).reduce((a, b) => a + b) / entries.length;
        service.handleTrend(ref, entries);

        expect(ref.trendWeight).toBe(avgWeight);
    });

    it('should handle inserting values in the middle', () => {});
});

function getFakeData(amount: number, array: WeightEntry[], step = 1) {
    for (let i = 0; i < amount; i += step) {
        array.push({
            weight: faker.random.number({ min: 80, max: 90 }),
            date: new Date(2018, 0, i + 1).toISOString(),
            trendWeight: 0,
            unit: 'metric'
        });
    }
}
