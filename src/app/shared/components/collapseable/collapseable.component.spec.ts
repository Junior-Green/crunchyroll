import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseableComponent } from './collapseable.component';

describe('CollapseableComponent', () => {
  let component: CollapseableComponent;
  let fixture: ComponentFixture<CollapseableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapseableComponent]
    });
    fixture = TestBed.createComponent(CollapseableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
