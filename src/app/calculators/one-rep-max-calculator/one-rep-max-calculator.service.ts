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
    public calculateOneRepMax(repMax: RepMax, round: boolean = true): number {
        if (isNaN(repMax.weight) || isNaN(repMax.reps)) {
            // TODO: error handling
            console.log('not a number');
            return;
        }

        if (repMax.reps === 1) {
            return repMax.weight;
        }

        const countOfMethods = this.calculationMethods.length;
        const total =
            this.calculationMethods
                .map(method => method(repMax.weight, repMax.reps))
                .reduce((runningTotal, num) => runningTotal + num) / countOfMethods;

        return round ? Math.round(total) : total;
    }

    /**
     * Returns the estimated rep maxes in a range of 1-10 reps based on the given one rep max.
     * @param weight How much weight was moved
     * @param repetitions How many repetitions this weight was moved.
     */
    public calculateNRepMax(repMax: RepMax, oneRM: number = null): RepMax[] {
        if (oneRM === null) {
            oneRM = this.calculateOneRepMax(repMax);
        }

        const result: RepMax[] = [];
        for (let i = 1; i <= 10; i++) {
            if (repMax.reps === i) {
                result.push({ reps: i, weight: repMax.weight });
                continue;
            }
            result.push({ reps: i, weight: Math.round(this.percentageOfRM[i] * oneRM) });
        }
        return result;
    }

    private epley(w: number, r: number) {
        return w * (1 + r / 30);
    }
}
