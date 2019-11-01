import { TestBed } from '@angular/core/testing';

import { ObjectEspecialRegimeService } from './object-especial-regime.service';

describe('ObjectEspecialRegimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectEspecialRegimeService = TestBed.get(ObjectEspecialRegimeService);
    expect(service).toBeTruthy();
  });
});
