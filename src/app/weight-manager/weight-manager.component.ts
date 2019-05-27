import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewWeightEntryDialogComponent } from './new-weight-entry/new-weight-entry-dialog.component';

@Component({
    selector: 'skoll-weight-manager',
    templateUrl: './weight-manager.component.html',
    styleUrls: ['./weight-manager.component.scss']
})
export class WeightManagerComponent implements OnInit {
    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    openAddDialog() {
        console.log('wtf');
        const dialogRef = this.dialog.open(NewWeightEntryDialogComponent, {
            width: '250px',
            height: '250px'
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
