import { TestBed } from '@angular/core/testing';

import { CentroEstudiosService } from './centro-estudios.service';

describe('CentroEstudiosService', () => {
  let service: CentroEstudiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroEstudiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
