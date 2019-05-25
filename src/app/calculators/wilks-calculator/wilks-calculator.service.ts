import { Injectable } from '@angular/core';
import { Unit } from 'src/app/models/unit';
import { Sex } from 'src/app/models/sex';
import { FormGroup, AbstractControl } from '@angular/forms';
import { RepMax } from 'src/app/models/rep-max';
import { OneRepMaxCalculatorService } from '../one-rep-max-calculator/one-rep-max-calculator.service';

@Injectable({
    providedIn: 'root'
})
export class WilksCalculatorService {
    constructor(private oneRM: OneRepMaxCalculatorService) {}
    public units: Unit[] = [{ id: 1, name: 'Metric' }, { id: 2, name: 'Imperial' }];
    public sexes: Sex[] = [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }];

    private kgTolbs = 0.45359237;

    private maleValues: { [val: string]: number } = {
        a: -216.0475144,
        b: 16.2606339,
        c: -0.002388645,
        d: -0.00113732,
        e: 7.01863e-6,
        f: -1.291e-8
    };

    private femaleValues: { [val: string]: number } = {
        a: 594.31747775582,
        b: -27.23842536447,
        c: 0.82112226871,
        d: -0.00930733913,
        e: 4.731582e-5,
        f: -9.054e-8
    };

    private coefficients: { [sex: number]: { [val: string]: number } } = {
        1: this.maleValues,
        2: this.femaleValues
    };

    public calculate(maxes: RepMax[], bodyweight: number, sex: number, unit: number) {
        const bodyweightInKilograms = this.convertToKilogram(bodyweight, unit);

        const total = this.getSBDTotalFromRepMaxes(maxes);
        const totalInKilograms = this.convertToKilogram(total, unit);

        const wilks = this.wilksEquation(totalInKilograms, bodyweightInKilograms, sex);
        return wilks;
    }

    private convertToKilogram(num: number, currentUnit: number) {
        return currentUnit === 1 ? num : num * this.kgTolbs;
    }

    private wilksEquation(totalInKilograms: number, bodyweightInKilograms: number, sex: number) {
        return totalInKilograms * this.wilksCoefficient(bodyweightInKilograms, sex);
    }

    private wilksCoefficient(bw: number, sex: number) {
        const _ = this.coefficients[sex];
        return (
            500 /
            (_['a'] +
                _['b'] * bw +
                _['c'] * Math.pow(bw, 2) +
                _['d'] * Math.pow(bw, 3) +
                _['e'] * Math.pow(bw, 4) +
                _['f'] * Math.pow(bw, 5))
        );
    }

    private getSBDTotalFromRepMaxes(maxes: RepMax[]): number {
        if (maxes.length > 4 || maxes.length < 3) {
            console.log('error');
        }

        return maxes
            .map(this.oneRM.calculateOneRepMax)
            .reduce((runningTotal, current) => runningTotal + current);
    }
}
