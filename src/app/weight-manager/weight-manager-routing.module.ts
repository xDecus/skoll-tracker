import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeightManagerComponent } from './weight-manager.component';

const routes: Routes = [
    {
        path: '',
        component: WeightManagerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeightManagerRoutingModule {}
