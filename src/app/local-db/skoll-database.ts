import Dexie from 'dexie';
import 'dexie-observable';
import { WeightEntry } from '../models/weight-entry';
import { IWeightEntry } from '../models/weight-entry.interface';

export class SkollDatabase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    public weightEntries: Dexie.Table<IWeightEntry, number>; // number = type of the primkey
    // ...other tables go here...

    constructor() {
        super('SkollDatabase');
        this.version(1).stores({
            weightEntries: '++id, weight, trendweight, unit, date'
            // ...other tables go here...
        });
        this.weightEntries.mapToClass(WeightEntry);
    }
}
