import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyfatCalculatorComponent } from './bodyfat-calculator.component';
import { Helper } from 'src/app/helper';

describe('BodyfatCalculatorComponent', () => {
    let component: BodyfatCalculatorComponent;
    let fixture: ComponentFixture<BodyfatCalculatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BodyfatCalculatorComponent],
            imports: [...Helper.UnitTestImports]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BodyfatCalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
