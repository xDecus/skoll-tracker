import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightManagerRoutingModule } from './weight-manager-routing.module';
import { WeightManagerComponent } from './weight-manager.component';
import { MaterialModule } from '../material/material.module';
import { NewWeightEntryDialogComponent } from './new-weight-entry/new-weight-entry-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [WeightManagerComponent, NewWeightEntryDialogComponent],
    imports: [
        CommonModule,
        WeightManagerRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [NewWeightEntryDialogComponent]
})
export class WeightManagerModule {}
