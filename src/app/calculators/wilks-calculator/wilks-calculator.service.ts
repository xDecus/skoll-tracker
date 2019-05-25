import { Injectable } from '@angular/core';
import { RepMax } from 'src/app/models/rep-max';
import { OneRepMaxCalculatorService } from '../one-rep-max-calculator/one-rep-max-calculator.service';

@Injectable({
    providedIn: 'root'
})
export class WilksCalculatorService {
    constructor(private oneRM: OneRepMaxCalculatorService) {}

    /**
     * Available units for calculation.
     */
    public units: string[] = ['metric', 'imperial'];

    /**
     * Biological sexes used for calculation.
     */
    public sexes: string[] = ['male', 'female'];

    /**
     * Conversion factor from pounds to kilograms
     */
    private LbsToKg = 0.45359237;

    /**
     * Values used in the wilks equation for male lifters
     */
    private maleValues: { [val: string]: number } = {
        a: -216.0475144,
        b: 16.2606339,
        c: -0.002388645,
        d: -0.00113732,
        e: 7.01863e-6,
        f: -1.291e-8
    };

    /**
     * Values used in the wilks equation for female lifters
     */
    private femaleValues: { [val: string]: number } = {
        a: 594.31747775582,
        b: -27.23842536447,
        c: 0.82112226871,
        d: -0.00930733913,
        e: 4.731582e-5,
        f: -9.054e-8
    };

    /**
     * Coefficients for the wilks equation
     */
    private coefficients: { [sex: string]: { [val: string]: number } } = {
        male: this.maleValues,
        female: this.femaleValues
    };

    /**
     * Calculates the Wilks points for the lifter based on this total in Squat, Bench and Deadlift, their bodyweight and their sex
     * * If the maxes provided are not 1RM, an estimated one rm will be calculated
     * * If the unit is not metric, all values will be converted to kilograms
     * @param maxes The rep maxes of the lifter in Squat, bench and deadlift.
     * @param bodyweight The bodyweight of the lifter in the specified unit
     * @param sex The biological sex of the lifter
     * @param unit
     */
    public calculate(
        maxes: RepMax[],
        bodyweight: number,
        sex: 'male' | 'female',
        unit: 'metric' | 'imperial'
    ): { wilks: number; total: number } {
        const bodyweightInKilograms = this.convertToKilogram(bodyweight, unit);

        const total = this.getSBDTotalFromRepMaxes(maxes);
        const totalInKilograms = this.convertToKilogram(total, unit);

        const wilks = this.wilksEquation(totalInKilograms, bodyweightInKilograms, sex);
        return { wilks: Math.round(wilks), total: Math.round(total) };
    }

    /**
     * Converts the given value to kilograms if the current unit is imperial.
     * @param num The number to convert
     * @param currentUnit The current unit of the number
     */
    private convertToKilogram(num: number, currentUnit: 'metric' | 'imperial') {
        return currentUnit === 'metric' ? num : num * this.LbsToKg;
    }

    /**
     * Calculates the wilks points of the lifter using the wilks coefficient and their bodyweight in kilogram
     * @param totalInKilograms The powerlifting total (S/B/D) of the lifter in kilograms
     * @param bodyweightInKilograms The bodyweight of the lifter in kilogram
     * @param sex The biological sex of the lifter
     */
    private wilksEquation(
        totalInKilograms: number,
        bodyweightInKilograms: number,
        sex: 'male' | 'female'
    ) {
        return totalInKilograms * this.wilksCoefficient(bodyweightInKilograms, sex);
    }

    /**
     * Calculates the wilks coefficient based on the bodyweight of the lifter and their biological sex
     * @param bw The bodyweight of the lifter in kilograms
     * @param sex The biological sex of the lifter
     */
    private wilksCoefficient(bw: number, sex: 'male' | 'female') {
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

    /**
     * Calculates the powerlifting total based on the provided rep max
     * * If the rep max is not a one rep max, an estimation will be calculated
     * @param maxes The maxes in the lifts Squat, Bench and Deadlift of the lifter
     */
    private getSBDTotalFromRepMaxes(maxes: RepMax[]): number {
        if (maxes.length > 4 || maxes.length < 3) {
            console.log('error');
            return -1;
        }

        return maxes
            .map(max => this.oneRM.calculateOneRepMax(max, false))
            .reduce((runningTotal, current) => runningTotal + current);
    }
}
