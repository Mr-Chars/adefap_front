import { TestBed } from '@angular/core/testing';

import { RequestTorneoService } from './request-torneo.service';

describe('RequestTorneoService', () => {
  let service: RequestTorneoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestTorneoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
