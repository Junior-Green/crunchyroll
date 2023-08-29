import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutDropdownComponent } from './logged-out-dropdown.component';

describe('LoggedOutDropdownComponent', () => {
  let component: LoggedOutDropdownComponent;
  let fixture: ComponentFixture<LoggedOutDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedOutDropdownComponent]
    });
    fixture = TestBed.createComponent(LoggedOutDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
