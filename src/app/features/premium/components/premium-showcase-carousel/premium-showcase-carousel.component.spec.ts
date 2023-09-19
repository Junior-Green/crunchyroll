import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumShowcaseCarouselComponent } from './premium-showcase-carousel.component';

describe('PremiumShowcaseCarouselComponent', () => {
  let component: PremiumShowcaseCarouselComponent;
  let fixture: ComponentFixture<PremiumShowcaseCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumShowcaseCarouselComponent]
    });
    fixture = TestBed.createComponent(PremiumShowcaseCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
