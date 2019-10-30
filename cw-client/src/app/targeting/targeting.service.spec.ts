import { TestBed } from '@angular/core/testing';

import { TargetingService } from './targeting.service';

describe('TargetingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TargetingService = TestBed.get(TargetingService);
    expect(service).toBeTruthy();
  });
});
