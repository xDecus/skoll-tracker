import { TestBed } from '@angular/core/testing';

import { TotalCalculatorService } from './total-calculator.service';

describe('TotalCalculatorService', () => {
    let service: TotalCalculatorService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(TotalCalculatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly calculate powerlifting total', () => {
        const sbd = [{ reps: 1, weight: 180 }, { reps: 1, weight: 220 }, { reps: 1, weight: 110 }];
        const result = service.getSBDTotalFromRepMaxes(sbd);
        expect(result).toBe(510);
    });

    it('should correctly calculate powerlifting total with estimated rep maxes', () => {
        const sbd = [{ reps: 3, weight: 180 }, { reps: 2, weight: 220 }, { reps: 4, weight: 110 }];
        const result = service.getSBDTotalFromRepMaxes(sbd);
        const rounded = Math.round(result);
        expect(rounded).toBe(557);
    });
});
