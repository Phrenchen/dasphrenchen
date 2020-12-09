import { TestBed } from '@angular/core/testing';

import { AntsRenderingService } from './ants-rendering.service';

describe('AntsRenderingService', () => {
  let service: AntsRenderingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntsRenderingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
