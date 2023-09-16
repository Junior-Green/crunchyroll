import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumButtonComponent } from './premium-button.component';

describe('PremiumButtonComponent', () => {
  let component: PremiumButtonComponent;
  let fixture: ComponentFixture<PremiumButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumButtonComponent]
    });
    fixture = TestBed.createComponent(PremiumButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
