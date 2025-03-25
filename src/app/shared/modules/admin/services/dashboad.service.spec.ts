import { TestBed } from '@angular/core/testing';

import { DashboadService } from './dashboad.service';

describe('DashboadService', () => {
  let service: DashboadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
