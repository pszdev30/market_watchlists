import { TestBed } from '@angular/core/testing';

import { HoldingsResolverService } from './holdings-resolver.service';

describe('HoldingsResolverService', () => {
  let service: HoldingsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoldingsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
