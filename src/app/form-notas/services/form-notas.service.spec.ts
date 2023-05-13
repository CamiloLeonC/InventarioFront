import { TestBed } from '@angular/core/testing';

import { FormNotasService } from './form-notas.service';

describe('FormNotasService', () => {
  let service: FormNotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormNotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
