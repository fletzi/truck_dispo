import { TestBed } from '@angular/core/testing';

import { EditDriverPositionService } from './edit-driver-position.service';

describe('EditDriverPositionService', () => {
  let service: EditDriverPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDriverPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
