import { TestBed } from '@angular/core/testing';

import { ItemRegistrationService } from './item-registration.service';

describe('ItemRegistrationService', () => {
  let service: ItemRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
