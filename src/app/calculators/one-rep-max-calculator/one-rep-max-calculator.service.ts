import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OneRepMaxCalculatorService {
    constructor() {}

    calculateOneRepMax(weight: number, repetitions: number) {
        if (isNaN(weight) || isNaN(repetitions)) {
            console.log('not a number');
            return;
        }
    }
}
