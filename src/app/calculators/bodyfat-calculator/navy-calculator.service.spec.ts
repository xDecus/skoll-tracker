import { TestBed } from '@angular/core/testing';

import { NavyCalculatorService, NavyParameters } from './navy-calculator.service';
import { UnitConverterService } from '../unit-converter.service';

describe('NavyCalculatorService', () => {
    let service: NavyCalculatorService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(NavyCalculatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly calculate bodyfat for male/metric', () => {
        const inputParams: NavyParameters = { height: 188, neck: 45, abs: 100 };
        const expected = 20.7;

        const result = service.calculate(inputParams, 'male', 'metric');
        const actual = Math.round(result * 10) / 10;
        expect(actual).toBe(expected);
    });

    it('should correctly calculate bodyfat for male/imperial', () => {
        const inputParams: NavyParameters = {
            height: 188 / 2.54,
            neck: 45 / 2.54,
            abs: 100 / 2.54
        };

        const expected = 20.7;

        const result = service.calculate(inputParams, 'male', 'imperial');
        const actual = Math.round(result * 10) / 10;
        expect(actual).toBe(expected);
    });

    it('should correctly calculate bodyfat for female/metric', () => {
        const inputParams: NavyParameters = { height: 160, neck: 35, abs: 80, waist: 70, hips: 90 };
        const expected = 22;

        const result = service.calculate(inputParams, 'female', 'metric');
        const actual = Math.round(result * 10) / 10;
        expect(actual).toBe(expected);
    });
    it('should correctly calculate bodyfat for female/imperial', () => {
        const inputParams: NavyParameters = {
            height: 160 / 2.54,
            neck: 35 / 2.54,
            abs: 80 / 2.54,
            waist: 70 / 2.54,
            hips: 90 / 2.54
        };
        const expected = 22;

        const result = service.calculate(inputParams, 'female', 'imperial');
        const actual = Math.round(result * 10) / 10;
        expect(actual).toBe(expected);
    });
});
