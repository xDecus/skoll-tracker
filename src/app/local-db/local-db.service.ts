import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import 'dexie-observable';
import { SkollDatabase } from './skoll-database';

@Injectable({
    providedIn: 'root'
})
export class LocalDBService {
    private db: SkollDatabase;

    constructor() {
        console.log('[LocalDBService] Initializing DB');
        this.db = new SkollDatabase();
    }

    public addItem(tableName: string, value: any) {
        const table = this.db.table<any, number>(tableName);
        return this.db
            .transaction('rw', table, () => {
                console.log(
                    `[LocalDBService] Transaction opened. Putting ${JSON.stringify(
                        value
                    )} in table ${table.name}.`
                );
                return table.put(value);
            })
            .then(result => {
                console.log(
                    `[LocalDBService] Transaction committed. Created object with ID ${result}`
                );
                return result;
            })
            .catch(err => console.error(`[LocalDBService] Transaction error. ${err.stack}`));
    }

    public deleteItem(tableName: string, id: number) {
        const table = this.db.table(tableName);
        this.db
            .transaction('rw', table, async () => {
                console.log(
                    `[LocalDBService] Transaction opened. Deleting object with ID ${id} in table ${
                        table.name
                    }.`
                );
                await table.delete(id);
            })
            .then(() =>
                console.log(`[LocalDBService] Transaction committed. Deleted item with ID ${id}`)
            )
            .catch(err => console.error(`[LocalDBService] Transaction error. ${err.stack}`));
    }

    public getAllData<T>(
        tableName: string,
        filterFunc: (obj: T) => boolean = obj => true
    ): Dexie.Promise<T[]> {
        const table = this.db.table<T, number>(tableName);
        return table.filter(filterFunc).toArray();
    }

    public deleteDatabase() {
        this.db.delete().then(() => console.log('[LocalDBService] Database successfully deleted'));
    }
}
