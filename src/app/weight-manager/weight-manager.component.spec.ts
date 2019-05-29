import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightManagerComponent } from './weight-manager.component';
import { MaterialModule } from '../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter } from '@angular/material';
import { DateAdapterMock } from '../helper';

describe('WeightManagerComponent', () => {
    let component: WeightManagerComponent;
    let fixture: ComponentFixture<WeightManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WeightManagerComponent],
            providers: [{ provide: DateAdapter, useClass: DateAdapterMock }],
            imports: [MaterialModule, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WeightManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
