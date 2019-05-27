import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule
} from '@angular/material';

const MODULES = [
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class MaterialModule {}
