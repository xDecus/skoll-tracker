import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorsRoutingModule } from './calculators-routing.module';
import { WilksCalculatorComponent } from './wilks-calculator/wilks-calculator.component';
import { OneRepMaxCalculatorComponent } from './one-rep-max-calculator/one-rep-max-calculator.component';
import { TDEECalculatorComponent } from './tdeecalculator/tdeecalculator.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [WilksCalculatorComponent, OneRepMaxCalculatorComponent, TDEECalculatorComponent],
    imports: [
        CommonModule,
        CalculatorsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CalculatorsModule {}
