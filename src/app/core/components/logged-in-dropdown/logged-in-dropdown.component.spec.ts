import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInDropdownComponent } from './logged-in-dropdown.component';

describe('LoggedInDropdownComponent', () => {
  let component: LoggedInDropdownComponent;
  let fixture: ComponentFixture<LoggedInDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedInDropdownComponent]
    });
    fixture = TestBed.createComponent(LoggedInDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
