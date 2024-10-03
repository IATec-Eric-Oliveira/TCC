import { TestBed } from '@angular/core/testing';

import { GarageAccreditedService } from './garage-accredited.service';

describe('GarageAccreditedService', () => {
  let service: GarageAccreditedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageAccreditedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
