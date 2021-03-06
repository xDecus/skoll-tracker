import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OneRepMaxCalculatorComponent } from './one-rep-max-calculator/one-rep-max-calculator.component';
import { WilksCalculatorComponent } from './wilks-calculator/wilks-calculator.component';
import { TDEECalculatorComponent } from './tdeecalculator/tdeecalculator.component';
import { BodyfatCalculatorComponent } from './bodyfat-calculator/bodyfat-calculator.component';

const routes: Routes = [
    { path: '', redirectTo: '1rm', pathMatch: 'full' },
    { path: '1rm', component: OneRepMaxCalculatorComponent },
    { path: 'wilks', component: WilksCalculatorComponent },
    { path: 'tdee', component: TDEECalculatorComponent },
    { path: 'bodyfat', component: BodyfatCalculatorComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalculatorsRoutingModule {}
