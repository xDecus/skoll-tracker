import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WilksCalculatorComponent } from './wilks-calculator.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('WilksCalculatorComponent', () => {
    let component: WilksCalculatorComponent;
    let fixture: ComponentFixture<WilksCalculatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WilksCalculatorComponent],
            imports: [NoopAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WilksCalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
