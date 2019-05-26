import { Injectable } from '@angular/core';
import { UnitConverterService } from '../unit-converter.service';

@Injectable({
    providedIn: 'root'
})
export class WilksCalculatorService {
    constructor(private converter: UnitConverterService) {}

    /**
     * Contains all variables used in the wilks equation
     */
    private variables = {
        male: {
            a: -216.0475144,
            b: 16.2606339,
            c: -0.002388645,
            d: -0.00113732,
            e: 7.01863e-6,
            f: -1.291e-8
        },
        female: {
            a: 594.31747775582,
            b: -27.23842536447,
            c: 0.82112226871,
            d: -0.00930733913,
            e: 4.731582e-5,
            f: -9.054e-8
        }
    };

    /**
     * Calculates the Wilks points for the lifter based on this total in Squat, Bench and Deadlift, their bodyweight and their sex
     * * If the maxes provided are not 1RM, an estimated one rm will be calculated
     * * If the unit is not metric, all values will be converted to kilograms
     * @param powerliftingTotal The powerlifting total of the lifter (S,B,D)
     * @param bodyweight The bodyweight of the lifter in the specified unit
     * @param sex The biological sex of the lifter
     * @param unit The unit of the provided values
     */
    public calculate(
        powerliftingTotal: number,
        bodyweight: number,
        sex: 'male' | 'female',
        unit: 'metric' | 'imperial'
    ): number {
        if (unit === 'imperial') {
            bodyweight = this.converter.convertToKilogram(bodyweight);
            powerliftingTotal = this.converter.convertToKilogram(powerliftingTotal);
        }
        const wilks = this.wilksEquation(powerliftingTotal, bodyweight, sex);
        return Math.round(wilks);
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
        const _ = this.variables[sex];
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
}
