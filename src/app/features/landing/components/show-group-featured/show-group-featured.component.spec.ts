import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupFeaturedComponent } from './show-group-featured.component';

describe('ShowGroupFeaturedComponent', () => {
  let component: ShowGroupFeaturedComponent;
  let fixture: ComponentFixture<ShowGroupFeaturedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowGroupFeaturedComponent]
    });
    fixture = TestBed.createComponent(ShowGroupFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
