import { TestBed } from '@angular/core/testing';

import { OneRepMaxCalculatorService } from './one-rep-max-calculator.service';

describe('OneRepMaxCalculatorService', () => {
    let service: OneRepMaxCalculatorService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(OneRepMaxCalculatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return the average result of all methods', () => {
        const w = 100;
        const r = 5;

        const calculatedMax = service.calculateOneRepMax(w, r);
        const e = (service as any).epley(w, r);
        const b = (service as any).brzycki(w, r);

        expect(calculatedMax).toBe((e + b) / 2);
    });

    it('should correctly calculate 1-10 rep maxes', () => {
        const expectedResults = [100, 95, 92, 89, 86, 83, 81, 79, 77, 73];

        const actualResult = service.calculateNRepMax(100);
        for (let i = 0; i < expectedResults.length; i++) {
            expect(actualResult[i].weight).toBe(expectedResults[i]);
        }
    });
});
