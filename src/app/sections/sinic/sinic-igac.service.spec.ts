import { TestBed } from '@angular/core/testing';

import { SinicIGACService } from './sinic-igac.service';

describe('SinicIGACService', () => {
  let service: SinicIGACService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinicIGACService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
