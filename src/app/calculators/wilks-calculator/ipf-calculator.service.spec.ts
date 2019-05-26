import { TestBed } from '@angular/core/testing';

import { IPFCalculatorService } from './ipf-calculator.service';

describe('IPFCalculatorService', () => {
    let service: IPFCalculatorService;
    let total: number;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(IPFCalculatorService);
        total = 500;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly calculate IPF Points for male/metric/raw', () => {
        const result = service.calculate(500, 100, 'male', 'metric', 'raw');
        expect(result).toBe(426);
    });

    it('should correctly calculate IPF Points for male/metric/equipped', () => {
        const result = service.calculate(500, 100, 'male', 'metric', 'equipped');
        expect(result).toBe(391);
    });

    it('should correctly calculate IPF Points for male/imperial/raw', () => {
        const result = service.calculate(500, 100, 'male', 'imperial', 'raw');
        expect(result).toBe(320);
    });

    it('should correctly calculate IPF Points for male/imperial/equipped', () => {
        const result = service.calculate(500, 100, 'male', 'imperial', 'equipped');
        expect(result).toBe(348);
    });

    it('should correctly calculate IPF Points for female/metric/raw', () => {
        const result = service.calculate(400, 60, 'female', 'metric', 'raw');
        expect(result).toBe(712);
    });

    it('should correctly calculate IPF Points for female/metric/equipped', () => {
        const result = service.calculate(400, 60, 'female', 'metric', 'equipped');
        expect(result).toBe(557);
    });

    it('should correctly calculate IPF Points for female/imperial/raw', () => {
        const result = service.calculate(400, 100, 'female', 'imperial', 'raw');
        expect(result).toBe(349);
    });

    it('should correctly calculate IPF Points for female/imperial/equipped', () => {
        const result = service.calculate(400, 100, 'female', 'imperial', 'equipped');
        expect(result).toBe(341);
    });
});
