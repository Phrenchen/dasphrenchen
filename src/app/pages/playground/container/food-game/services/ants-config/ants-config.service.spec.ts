import { TestBed } from '@angular/core/testing';

import { AntsConfigService } from './ants-config.service';

describe('AntsConfigService', () => {
  let service: AntsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
