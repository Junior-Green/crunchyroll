import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesLandingComponent } from './series-landing.component';

describe('SeriesLandingComponent', () => {
  let component: SeriesLandingComponent;
  let fixture: ComponentFixture<SeriesLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesLandingComponent]
    });
    fixture = TestBed.createComponent(SeriesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
