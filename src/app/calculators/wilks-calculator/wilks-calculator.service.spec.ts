import { TestBed } from '@angular/core/testing';

import { WilksCalculatorService } from './wilks-calculator.service';
import { RepMax } from 'src/app/models/rep-max';
import { TotalCalculatorService } from './total-calculator.service';
import { OneRepMaxCalculatorService } from '../one-rep-max-calculator/one-rep-max-calculator.service';

// expectations from wilks online calculators
describe('WilksCalculatorService', () => {
    let service: WilksCalculatorService;
    let total: number;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });
        service = TestBed.get(WilksCalculatorService);

        const sbd = [{ reps: 1, weight: 180 }, { reps: 1, weight: 220 }, { reps: 1, weight: 110 }];
        total = new TotalCalculatorService(
            new OneRepMaxCalculatorService()
        ).getSBDTotalFromRepMaxes(sbd);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly calculate wilks for male/metric', () => {
        const result = service.calculate(total, 100, 'male', 'metric');
        expect(result).toBe(310);
    });
    it('should correctly calculate wilks for male/imperial', () => {
        const result = service.calculate(total, 100, 'male', 'imperial');
        expect(result).toBe(264);
    });
    it('should correctly calculate wilks for female/metric', () => {
        const result = service.calculate(total, 80, 'female', 'metric');
        expect(result).toBe(467);
    });
    it('should correctly calculate wilks for female/imperial', () => {
        const result = service.calculate(total, 80, 'female', 'imperial');
        expect(result).toBe(363);
    });
});
