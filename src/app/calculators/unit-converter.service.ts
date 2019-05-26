import { Injectable } from '@angular/core';
import * as convert from 'convert-units';

@Injectable({
    providedIn: 'root'
})
export class UnitConverterService {
    /**
     * Conversion factor from pounds to kilograms
     */
    private static LbsToKg = 0.45359237;

    private static InchToCm = 2.54;
    /**
     * Converts the given value to kilograms
     * @param num The number to convert
     */
    public convertToKilogram(num: number) {
        return num * UnitConverterService.LbsToKg;
    }

    public convertToCm(num: number) {
        return num * UnitConverterService.InchToCm;
    }

    convert(val: number, from: string, to: string): number {
        return convert(val)
            .from(from)
            .to(to);
    }

    public bulkConvert(obj: object, from: string, to: string): any {
        Object.keys(obj).forEach(field => {
            if (!isNaN(obj[field])) {
                obj[field] = convert(obj[field])
                    .from(from)
                    .to(to);
            }
        });
        return obj;
    }
}
