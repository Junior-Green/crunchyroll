import { TestBed } from '@angular/core/testing';

import { FeaturedCarouselService } from './featured-carousel.service';

describe('FeaturedCarouselService', () => {
  let service: FeaturedCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
