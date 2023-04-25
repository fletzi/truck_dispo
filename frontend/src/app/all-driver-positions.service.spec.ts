import { TestBed } from '@angular/core/testing';

import { AllDriverPositionsService } from './all-driver-positions.service';

describe('AllDriverPositionsService', () => {
  let service: AllDriverPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllDriverPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
