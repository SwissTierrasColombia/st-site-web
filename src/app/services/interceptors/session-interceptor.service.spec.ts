import { TestBed } from '@angular/core/testing';

import { SessionInterceptorService } from './session-interceptor.service';

describe('SessionInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionInterceptorService = TestBed.get(SessionInterceptorService);
    expect(service).toBeTruthy();
  });
});
