import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupComponent } from './show-group.component';

describe('ShowGroupComponent', () => {
  let component: ShowGroupComponent;
  let fixture: ComponentFixture<ShowGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowGroupComponent]
    });
    fixture = TestBed.createComponent(ShowGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
