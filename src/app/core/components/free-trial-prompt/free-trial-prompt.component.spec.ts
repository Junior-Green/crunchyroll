import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTrialPromptComponent } from './free-trial-prompt.component';

describe('FreeTrialPromptComponent', () => {
  let component: FreeTrialPromptComponent;
  let fixture: ComponentFixture<FreeTrialPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeTrialPromptComponent]
    });
    fixture = TestBed.createComponent(FreeTrialPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
