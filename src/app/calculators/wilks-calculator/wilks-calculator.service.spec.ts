import { TestBed } from '@angular/core/testing';

import { WilksCalculatorService } from './wilks-calculator.service';

describe('WilksCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WilksCalculatorService = TestBed.get(WilksCalculatorService);
    expect(service).toBeTruthy();
  });
});
