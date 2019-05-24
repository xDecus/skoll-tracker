import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OneRepMaxCalculatorService {

    private calculationMethods: ((w: number, r: number) => number)[] = [this.brzycki, this.epley];
    /**
     * Calculates the one rep max given the provided weight and repetitions by using an average of multiple
     * calculation methods.
     * @param weight The weight that was lifted
     * @param repetitions How many times the weight was lifted
     */
    public calculateOneRepMax(weight: number, repetitions: number) {
        if (isNaN(weight) || isNaN(repetitions)) {
            // TODO: error handling
            console.log('not a number');
            return;
        }

        const countOfMethods = this.calculationMethods.length;
        const total = this.calculationMethods
            .map(method => method(weight, repetitions))
            .reduce((runningTotal, num) => runningTotal + num);

        return total / countOfMethods;
    }

    private brzycki(w: number, r: number) {
        return w * (36 / (37 - r));
    }

    private epley(w: number, r: number) {
        return w * (1 + r / 30);
    }
}
