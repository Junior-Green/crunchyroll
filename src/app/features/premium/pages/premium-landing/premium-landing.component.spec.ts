import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumLandingComponent } from './premium-landing.component';

describe('PremiumLandingComponent', () => {
  let component: PremiumLandingComponent;
  let fixture: ComponentFixture<PremiumLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumLandingComponent]
    });
    fixture = TestBed.createComponent(PremiumLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
