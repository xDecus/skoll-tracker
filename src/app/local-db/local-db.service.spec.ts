import { TestBed } from '@angular/core/testing';

import { LocalDBService } from './local-db.service';
import { WeightEntry } from '../models/weight-entry';
import { SkollDBConstants } from '../models/skoll-db-constants';

describe('LocalDBService', () => {
    let service: LocalDBService;
    let testEntry: WeightEntry;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(LocalDBService);
        testEntry = {
            weight: 50,
            unit: 'metric',
            date: new Date().toISOString(),
            trendWeight: 50
        };
    });

    it('should persist values and delete them', done => {
        service.addItem(SkollDBConstants.WeightEntries, testEntry).then(id => {
            service
                .getAllData<WeightEntry>(SkollDBConstants.WeightEntries)
                .then(val => {
                    expect(val.length).toBe(1);
                    expect(val[0].date).toBe(testEntry.date);
                })
                .then(() => {
                    service.deleteItem(SkollDBConstants.WeightEntries, id as number);
                })
                .then(() => {
                    service.getAllData<WeightEntry>(SkollDBConstants.WeightEntries).then(val => {
                        expect(val.length).toBe(0);
                        done();
                    });
                });
        });
    });

    afterAll(() => {
        service.deleteDatabase();
    });
});
