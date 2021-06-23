import { TestBed } from '@angular/core/testing';

import { LevCatReceptionService } from './lev-cat-reception.service';

describe('LevCatReceptionService', () => {
  let service: LevCatReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevCatReceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
