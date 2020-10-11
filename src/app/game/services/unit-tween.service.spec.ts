import { TestBed } from '@angular/core/testing';

import { UnitTweenService } from './unit-tween.service';

describe('UnitTweenService', () => {
  let service: UnitTweenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitTweenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
