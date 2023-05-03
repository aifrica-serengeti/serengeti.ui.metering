import { TestBed } from '@angular/core/testing';

import { MeteringService } from './metering.service';

describe('MeteringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeteringService = TestBed.get(MeteringService);
    expect(service).toBeTruthy();
  });
});
