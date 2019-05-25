import { TestBed } from '@angular/core/testing';

import { WilksCalculatorService } from './wilks-calculator.service';
import { RepMax } from 'src/app/models/rep-max';

// expectations from wilks online calculators
describe('WilksCalculatorService', () => {
    let service: WilksCalculatorService;
    let sbd: RepMax[];
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(WilksCalculatorService);
        sbd = [{ reps: 1, weight: 180 }, { reps: 1, weight: 220 }, { reps: 1, weight: 110 }];
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly calculate wilks for male/metric', () => {
        const result = service.calculate(sbd, 100, 'male', 'metric');
        expect(result.wilks).toBe(310);
    });
    it('should correctly calculate wilks for male/imperial', () => {
        const result = service.calculate(sbd, 100, 'male', 'imperial');
        expect(result.wilks).toBe(264);
    });
    it('should correctly calculate wilks for female/metric', () => {
        const result = service.calculate(sbd, 80, 'female', 'metric');
        expect(result.wilks).toBe(467);
    });
    it('should correctly calculate wilks for female/imperial', () => {
        const result = service.calculate(sbd, 80, 'female', 'imperial');
        expect(result.wilks).toBe(363);
    });
});
