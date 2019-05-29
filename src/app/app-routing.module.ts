import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'weight-manager',
        loadChildren: () =>
            import('./weight-manager/weight-manager.module').then(m => m.WeightManagerModule)
    },
    {
        path: 'calculators',
        loadChildren: () =>
            import('./calculators/calculators.module').then(m => m.CalculatorsModule)
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
