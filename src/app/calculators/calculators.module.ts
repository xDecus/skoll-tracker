import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorsRoutingModule } from './calculators-routing.module';
import { WilksCalculatorComponent } from './wilks-calculator/wilks-calculator.component';
import { OneRepMaxCalculatorComponent } from './one-rep-max-calculator/one-rep-max-calculator.component';
import { TDEECalculatorComponent } from './tdeecalculator/tdeecalculator.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BodyfatCalculatorComponent } from './bodyfat-calculator/bodyfat-calculator.component';

@NgModule({
    declarations: [WilksCalculatorComponent, OneRepMaxCalculatorComponent, TDEECalculatorComponent, BodyfatCalculatorComponent],
    imports: [
        CommonModule,
        CalculatorsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CalculatorsModule {}
