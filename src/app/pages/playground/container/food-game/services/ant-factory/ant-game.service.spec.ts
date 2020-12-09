import { TestBed } from '@angular/core/testing';

import { AntGameService } from './ant-game.service';

describe('AntGameService', () => {
  let service: AntGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
