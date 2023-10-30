import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupCarouselShowComponent } from './show-group-carousel-show.component';

describe('ShowGroupCarouselShowComponent', () => {
  let component: ShowGroupCarouselShowComponent;
  let fixture: ComponentFixture<ShowGroupCarouselShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowGroupCarouselShowComponent]
    });
    fixture = TestBed.createComponent(ShowGroupCarouselShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
