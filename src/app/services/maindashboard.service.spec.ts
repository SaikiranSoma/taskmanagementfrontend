import { TestBed } from '@angular/core/testing';

import { MaindashboardService } from './maindashboard.service';

describe('MaindashboardService', () => {
  let service: MaindashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaindashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
