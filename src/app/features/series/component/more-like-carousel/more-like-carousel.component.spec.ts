import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLikeCarouselComponent } from './more-like-carousel.component';

describe('MoreLikeCarouselComponent', () => {
  let component: MoreLikeCarouselComponent;
  let fixture: ComponentFixture<MoreLikeCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreLikeCarouselComponent]
    });
    fixture = TestBed.createComponent(MoreLikeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
