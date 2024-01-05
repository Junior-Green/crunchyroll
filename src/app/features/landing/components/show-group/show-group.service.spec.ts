import { TestBed } from '@angular/core/testing';

import { ShowGroupService } from './show-group.service';

describe('ShowGroupService', () => {
  let service: ShowGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
