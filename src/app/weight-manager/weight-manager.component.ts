import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewWeightEntryDialogComponent } from './new-weight-entry/new-weight-entry-dialog.component';
import { LocalDBService } from '../local-db/local-db.service';
import { WeightEntry } from '../models/weight-entry';
import { UserSettingsService } from '../user-settings.service';
import { MatTable } from '@angular/material/table';
import { Observable, Subject, from } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TrendWeightService } from './trend-weight.service';

@Component({
    selector: 'skoll-weight-manager',
    templateUrl: './weight-manager.component.html',
    styleUrls: ['./weight-manager.component.scss']
})
export class WeightManagerComponent implements OnInit {
    @ViewChild(MatTable, { static: false })
    private table: MatTable<any>;

    weight$: Subject<WeightEntry[]> = new Subject<WeightEntry[]>();
    weights: WeightEntry[] = [];
    displayedColumns = ['date', 'weight', 'trendWeight'];
    constructor(
        private dialog: MatDialog,
        private db: LocalDBService,
        private userSettings: UserSettingsService,
        private trend: TrendWeightService
    ) {}

    ngOnInit() {}

    openAddDialog() {
        const dialogRef = this.dialog.open(NewWeightEntryDialogComponent, {
            data: {
                date: new Date(),
                unit: this.userSettings.unit,
                weight: 100
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            const entry: WeightEntry = {
                unit: result.unit,
                weight: result.weight,
                date: result.date,
                trendWeight: result.trendWeight
            };
            this.weights.push(entry);
            this.weights.sort((x, y) => this.trend.sortByDate(x.date, y.date));
            this.weight$.next(this.weights);
        });
    }
}
