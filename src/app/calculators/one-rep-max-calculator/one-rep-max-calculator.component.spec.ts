import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRepMaxCalculatorComponent } from './one-rep-max-calculator.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('OneRepMaxCalculatorComponent', () => {
    let component: OneRepMaxCalculatorComponent;
    let fixture: ComponentFixture<OneRepMaxCalculatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OneRepMaxCalculatorComponent],
            imports: [NoopAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OneRepMaxCalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
