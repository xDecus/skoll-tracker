import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWeightEntryDialogComponent } from './new-weight-entry-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('NewWeightEntryDialogComponent', () => {
    let component: NewWeightEntryDialogComponent;
    let fixture: ComponentFixture<NewWeightEntryDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewWeightEntryDialogComponent],
            imports: [MaterialModule, NoopAnimationsModule],
            providers: [{ provide: MatDialogRef, use: {} }, { provide: MAT_DIALOG_DATA, use: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewWeightEntryDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
