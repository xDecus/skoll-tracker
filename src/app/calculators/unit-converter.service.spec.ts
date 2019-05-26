import { TestBed } from '@angular/core/testing';

import { UnitConverterService } from './unit-converter.service';

describe('UnitConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitConverterService = TestBed.get(UnitConverterService);
    expect(service).toBeTruthy();
  });
});
