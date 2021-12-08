import { TestBed } from '@angular/core/testing';

import { SinicService } from './sinic.service';

describe('SinicService', () => {
  let service: SinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
