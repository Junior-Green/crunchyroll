import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumHeaderComponent } from './premium-header.component';

describe('PremiumHeaderComponent', () => {
  let component: PremiumHeaderComponent;
  let fixture: ComponentFixture<PremiumHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumHeaderComponent]
    });
    fixture = TestBed.createComponent(PremiumHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
