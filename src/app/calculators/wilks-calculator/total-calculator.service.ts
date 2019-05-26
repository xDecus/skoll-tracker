import { Injectable } from '@angular/core';
import { OneRepMaxCalculatorService } from '../one-rep-max-calculator/one-rep-max-calculator.service';
import { RepMax } from 'src/app/models/rep-max';

@Injectable({
    providedIn: 'root'
})
export class TotalCalculatorService {
    constructor(private oneRM: OneRepMaxCalculatorService) {}

    /**
     * Calculates the powerlifting total based on the provided rep max
     * * If the rep max is not a one rep max, an estimation will be calculated
     * @param maxes The maxes in the lifts Squat, Bench and Deadlift of the lifter
     */
    public getSBDTotalFromRepMaxes(maxes: RepMax[]): number {
        if (maxes.length > 4 || maxes.length < 3) {
            console.log('error');
            return -1;
        }

        return maxes
            .map(max => this.oneRM.calculateOneRepMax(max, false))
            .reduce((runningTotal, current) => runningTotal + current);
    }
}
