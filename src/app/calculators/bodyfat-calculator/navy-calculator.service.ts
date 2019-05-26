import { Injectable } from '@angular/core';
import { UnitConverterService } from '../unit-converter.service';

@Injectable({
    providedIn: 'root'
})
export class NavyCalculatorService {
    constructor(private converter: UnitConverterService) {}

    public calculate(params: NavyParameters, sex: 'male' | 'female', unit: 'metric' | 'imperial') {
        if (unit === 'imperial') {
            params = this.converter.bulkConvert(params, 'in', 'cm');
        }

        const a = Math.log10(params.abs - params.neck);
        const b = Math.log10(params.height);

        return sex === 'male' ? this.calcMale(a, b) : this.calcFemale(a, b, params);
    }

    private calcMale(a: number, b: number) {
        return 86.01 * a - 70.041 * b + 30.3;
    }
    private calcFemale(a: number, b: number, params: NavyParameters) {
        const c = Math.log10(params.waist + params.hips - params.neck);
        return 163.205 * c - 97.684 * b - 104.912;
    }
}

export class NavyParameters {
    neck: number;
    abs: number;
    height: number;
    waist?: number;
    hips?: number;
}
