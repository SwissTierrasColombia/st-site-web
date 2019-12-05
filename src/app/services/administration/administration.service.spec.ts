import { TestBed } from '@angular/core/testing';

import { AdministrationService } from './administration.service';

describe('AdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministrationService = TestBed.get(AdministrationService);
    expect(service).toBeTruthy();
  });
});
