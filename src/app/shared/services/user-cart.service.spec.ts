import { TestBed, inject } from '@angular/core/testing';

import { UserCartService } from './user-cart.service';

describe('UserCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCartService]
    });
  });

  it('should be created', inject([UserCartService], (service: UserCartService) => {
    expect(service).toBeTruthy();
  }));
});
