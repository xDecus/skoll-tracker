import { Injectable } from '@angular/core';
import { RepMax } from 'src/app/models/rep-max';

@Injectable({
    providedIn: 'root'
})
export class OneRepMaxCalculatorService {
    private calculationMethods: ((w: number, r: number) => number)[] = [this.epley];

    private percentageOfRM: { [repMax: number]: number } = {
        1: 1,
        2: 0.95,
        3: 0.92,
        4: 0.89,
        5: 0.86,
        6: 0.83,
        7: 0.81,
        8: 0.79,
        9: 0.77,
        10: 0.73
    };
    /**
     * Calculates the one rep max given the provided weight and repetitions by using an average of multiple
     * calculation methods.
     * @param weight The weight that was lifted
     * @param repetitions How many times the weight was lifted
     */
    public calculateOneRepMax(weight: number, repetitions: number): number {
        if (isNaN(weight) || isNaN(repetitions)) {
            // TODO: error handling
            console.log('not a number');
            return;
        }

        if (repetitions === 1) {
            return weight;
        }

        const countOfMethods = this.calculationMethods.length;
        const total = this.calculationMethods
            .map(method => method(weight, repetitions))
            .reduce((runningTotal, num) => runningTotal + num);

        return Math.round(total / countOfMethods);
    }

    /**
     * Returns the estimated rep maxes in a range of 1-10 reps based on the given one rep max.
     * @param weight The one rep max of the lifter
     */
    public calculateNRepMax(weight: number): RepMax[] {
        const result: RepMax[] = [];
        for (let i = 1; i <= 10; i++) {
            result.push({ reps: i, weight: Math.round(this.percentageOfRM[i] * weight) });
        }
        return result;
    }

    private epley(w: number, r: number) {
        return w * (1 + r / 30);
    }
}
