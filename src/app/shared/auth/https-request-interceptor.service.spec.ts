import { TestBed } from '@angular/core/testing';

import { HttpsRequestInterceptorService } from './https-request-interceptor.service';

describe('HttpsRequestInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpsRequestInterceptorService = TestBed.get(HttpsRequestInterceptorService);
    expect(service).toBeTruthy();
  });
});
