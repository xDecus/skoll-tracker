import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UnitConverterService {
    /**
     * Conversion factor from pounds to kilograms
     */
    private LbsToKg = 0.45359237;

    /**
     * Converts the given value to kilograms
     * @param num The number to convert
     */
    public convertToKilogram(num: number) {
        return num * this.LbsToKg;
    }
}
