import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TDEECalculatorComponent } from './tdeecalculator.component';

describe('TDEECalculatorComponent', () => {
  let component: TDEECalculatorComponent;
  let fixture: ComponentFixture<TDEECalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TDEECalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TDEECalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
