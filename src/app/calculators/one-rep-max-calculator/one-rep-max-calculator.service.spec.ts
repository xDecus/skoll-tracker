import { TestBed } from '@angular/core/testing';

import { OneRepMaxCalculatorService } from './one-rep-max-calculator.service';

describe('OneRepMaxCalculatorService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: OneRepMaxCalculatorService = TestBed.get(OneRepMaxCalculatorService);
        expect(service).toBeTruthy();
    });

    it('should return the average result of all methods', () => {
        const w = 100;
        const r = 5;
        const service: OneRepMaxCalculatorService = TestBed.get(OneRepMaxCalculatorService);

        const calculatedMax = service.calculateOneRepMax(w, r);
        const e = (service as any).epley(w, r);
        const b = (service as any).brzycki(w, r);

        expect(calculatedMax).toBe((e + b) / 2);
    });
});
