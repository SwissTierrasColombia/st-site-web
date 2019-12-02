import { TestBed } from '@angular/core/testing';

import { PocService } from './poc.service';

describe('PocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocService = TestBed.get(PocService);
    expect(service).toBeTruthy();
  });
});
