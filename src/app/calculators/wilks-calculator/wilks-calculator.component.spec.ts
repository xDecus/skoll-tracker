import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WilksCalculatorComponent } from './wilks-calculator.component';

describe('WilksCalculatorComponent', () => {
  let component: WilksCalculatorComponent;
  let fixture: ComponentFixture<WilksCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WilksCalculatorComponent ]
    })
    .compileComponents();
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
