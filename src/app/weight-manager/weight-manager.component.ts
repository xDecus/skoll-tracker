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
import * as papaparse from 'papaparse';

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
                trendWeight: 0
            };
            this.weights.push(entry);
            this.trend.handleTrend(entry, this.weights);
            this.weight$.next(this.weights);
        });
    }
    handleFileInput(evn) {
        console.log(evn[0]);
        const parsed = papaparse.parse(evn[0], {
            complete: this.processImportedData.bind(this)
        });
    }

    processImportedData(results: papaparse.ParseResult) {
        if (results.errors.length > 0) {
            console.error(results.errors);
        }
        console.log(results.data);
        const unit: 'metric' | 'imperial' =
            results.data[1][0].split(':')[1] === 'kg' ? 'metric' : 'imperial';
        const cleaned = results.data.slice(4, results.data.length - 1);
        console.log(cleaned);
        const weightEntries: WeightEntry[] = cleaned.map((val: string[]) => {
            return {
                date: new Date(val[0]).toISOString(),
                weight: +val[1],
                unit
            };
        });
        this.weights.push(...weightEntries);
        this.trend.recalculateTrends(this.weights);
        this.weight$.next(this.weights);
    }
}
