import { TestBed } from '@angular/core/testing';

import { PremiumLandingService } from './premium-landing.service';

describe('PremiumLandingService', () => {
  let service: PremiumLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremiumLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
