import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslucentHeaderComponent } from './translucent-header.component';

describe('TranslucentHeaderComponent', () => {
  let component: TranslucentHeaderComponent;
  let fixture: ComponentFixture<TranslucentHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslucentHeaderComponent]
    });
    fixture = TestBed.createComponent(TranslucentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
