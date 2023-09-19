import { TestBed } from '@angular/core/testing';

import { PremiumShowcaseCarouselService } from './premium-showcase-carousel.service';

describe('PremiumShowcaseCarouselService', () => {
  let service: PremiumShowcaseCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremiumShowcaseCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
