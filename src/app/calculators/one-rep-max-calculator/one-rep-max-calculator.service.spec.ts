import { TestBed } from '@angular/core/testing';

import { OneRepMaxCalculatorService } from './one-rep-max-calculator.service';
import { RepMax } from 'src/app/models/rep-max';

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
        const input: RepMax = { weight: 100, reps: 5 };

        const calculatedMax = service.calculateOneRepMax(input);
        const e = (service as any).epley(input.weight, input.reps);

        expect(calculatedMax).toBe(Math.round(e / 1));
    });

    it('should correctly calculate 1-10 rep maxes', () => {
        const expectedResults = [100, 95, 92, 89, 86, 83, 81, 79, 77, 73];

        const actualResult = service.calculateNRepMax({ weight: 100, reps: 1 });
        for (let i = 0; i < expectedResults.length; i++) {
            expect(actualResult[i].weight).toBe(expectedResults[i]);
        }
    });

    it('should return correct numbers for one repetition', () => {
        const input: RepMax = { weight: 100, reps: 1 };
        const expectation = input.weight;

        const actual = service.calculateOneRepMax(input);
        expect(actual).toBe(expectation);
    });

    it('should return the same weight for n-rep as the input for n rep', () => {
        const input = { weight: 148, reps: 7 };
        const actual = service.calculateNRepMax(input);
        expect(actual.find(rm => rm.reps === input.reps).weight).toBe(input.weight);
    });
});
