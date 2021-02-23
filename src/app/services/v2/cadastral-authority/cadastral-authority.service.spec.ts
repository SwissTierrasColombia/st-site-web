import { TestBed } from '@angular/core/testing';

import { CadastralAuthorityService } from './cadastral-authority.service';

describe('CadastralAuthorityService', () => {
  let service: CadastralAuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastralAuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
