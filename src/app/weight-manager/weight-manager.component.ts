import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewWeightEntryDialogComponent } from './new-weight-entry/new-weight-entry-dialog.component';
import { LocalDBService } from '../local-db/local-db.service';
import { WeightEntry } from '../models/weight-entry';
import { UserSettingsService } from '../user-settings.service';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { TrendWeightService } from './trend-weight.service';
import * as papaparse from 'papaparse';
import * as Chart from 'chart.js';

@Component({
    selector: 'skoll-weight-manager',
    templateUrl: './weight-manager.component.html',
    styleUrls: ['./weight-manager.component.scss']
})
export class WeightManagerComponent implements OnInit, AfterViewInit {
    @ViewChild(MatTable, { static: false })
    private table: MatTable<any>;

    @ViewChild('skollchart', { static: false })
    private canvasRef: ElementRef;

    chart: Chart;
    weight$: Subject<WeightEntry[]> = new Subject<WeightEntry[]>();
    weights: WeightEntry[] = [];
    weightData: { x: Date; y: number }[] = [];
    displayedColumns = ['date', 'weight', 'trendWeight'];
    constructor(
        private dialog: MatDialog,
        private db: LocalDBService,
        private userSettings: UserSettingsService,
        private trend: TrendWeightService
    ) {}

    ngOnInit() {}

    ngAfterViewInit(): void {
        this.chart = new Chart(this.canvasRef.nativeElement, {
            type: 'line',

            data: {
                datasets: [
                    {
                        data: this.weightData,
                        borderColor: '#009688',
                        backgroundColor: 'rgba(0, 150, 136, 0.4)'
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{ type: 'time', time: { unit: 'month' } }]
                },
                legend: { display: false }
            }
        });
    }

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
    public handleFileInput(files) {
        papaparse.parse(files[0], {
            complete: this.processImportedData.bind(this)
        });
    }

    private processImportedData(results: papaparse.ParseResult) {
        if (results.errors.length > 0) {
            console.error(results.errors);
        }
        const unit: 'metric' | 'imperial' =
            results.data[1][0].split(':')[1] === 'kg' ? 'metric' : 'imperial';
        const cleaned = results.data.slice(4, results.data.length - 1);
        const weightEntries: WeightEntry[] = cleaned.map((val: string[]) => {
            return {
                date: new Date(val[0]).toISOString(),
                weight: +val[1],
                unit
            };
        });
        this.weights.push(...weightEntries);
        this.trend.recalculateTrends(this.weights);
        const dataPoints = this.weights.map(entry => {
            return { x: new Date(entry.date), y: entry.trendWeight };
        });
        this.weightData.push(...dataPoints);
        this.chart.update();
        this.weight$.next(this.weights);
    }
}
