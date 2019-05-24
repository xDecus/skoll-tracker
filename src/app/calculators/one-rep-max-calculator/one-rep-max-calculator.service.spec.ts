import { TestBed } from '@angular/core/testing';

import { OneRepMaxCalculatorService } from './one-rep-max-calculator.service';

describe('OneRepMaxCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneRepMaxCalculatorService = TestBed.get(OneRepMaxCalculatorService);
    expect(service).toBeTruthy();
  });
});
