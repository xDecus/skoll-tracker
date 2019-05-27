import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'skoll-new-weight-entry-dialog',
    templateUrl: './new-weight-entry-dialog.component.html',
    styleUrls: ['./new-weight-entry-dialog.component.scss']
})
export class NewWeightEntryDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<NewWeightEntryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {}

    onCancelClick() {
        this.dialogRef.close();
    }
}
