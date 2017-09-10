import { TestBed, inject } from '@angular/core/testing';

import { MerchantApiService } from './merchant-api.service';

describe('MerchantApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchantApiService]
    });
  });

  it('should be created', inject([MerchantApiService], (service: MerchantApiService) => {
    expect(service).toBeTruthy();
  }));
});
