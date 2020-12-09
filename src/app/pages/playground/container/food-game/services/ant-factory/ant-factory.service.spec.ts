import { TestBed } from '@angular/core/testing';

import { AntFactoryService } from './ant-factory.service';

describe('AntFactoryService', () => {
  let service: AntFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
