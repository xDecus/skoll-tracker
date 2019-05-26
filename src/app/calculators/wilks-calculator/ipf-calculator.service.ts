import { Injectable } from '@angular/core';
import { UnitConverterService } from '../unit-converter.service';

@Injectable({
    providedIn: 'root'
})
export class IPFCalculatorService {
    private variables = {
        male: {
            raw: {
                SBD: [310.67, 857.785, 53.216, 147.0835],
                S: [123.1, 363.085, 25.1667, 75.4311],
                B: [86.4745, 259.155, 17.57845, 53.122],
                D: [103.5355, 244.765, 15.3714, 31.5022]
            },
            equipped: {
                SBD: [387.265, 1121.28, 80.6324, 222.4896],
                S: [150.485, 446.445, 36.5155, 103.7061],
                B: [133.94, 441.465, 35.3938, 113.0057],
                D: [110.135, 263.66, 14.996, 23.011]
            }
        },
        female: {
            raw: {
                SBD: [125.1435, 228.03, 34.5246, 86.8301],
                S: [50.479, 105.632, 19.1846, 56.2215],
                B: [25.0485, 43.848, 6.7172, 13.952],
                D: [47.136, 67.349, 9.1555, 13.67]
            },
            equipped: {
                SBD: [176.58, 373.315, 48.4534, 110.0103],
                S: [74.6855, 171.585, 21.9475, 52.2948],
                B: [49.106, 124.209, 23.199, 67.4926],
                D: [51.002, 69.8265, 8.5802, 5.7258]
            }
        }
    };

    public calculate(
        total: number,
        bodyweight: number,
        sex: 'male' | 'female',
        unit: 'metric' | 'imperial',
        equipment: 'raw' | 'equipped'
    ) {
        if (unit === 'imperial') {
            bodyweight = this.converter.convertToKilogram(bodyweight);
            total = this.converter.convertToKilogram(total);
        }
        const variables = this.variables[sex][equipment]['SBD'];
        const mean = variables[0] * Math.log(bodyweight) - variables[1];
        const dev = variables[2] * Math.log(bodyweight) - variables[3];
        const points = 500 + (100 * (total - mean)) / dev;
        return Math.round(points);
    }
    constructor(private converter: UnitConverterService) {}
}
