import { TestBed } from '@angular/core/testing';

import { PasswordRecoverService } from './password-recover.service';

describe('PasswordRecoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordRecoverService = TestBed.get(PasswordRecoverService);
    expect(service).toBeTruthy();
  });
});
