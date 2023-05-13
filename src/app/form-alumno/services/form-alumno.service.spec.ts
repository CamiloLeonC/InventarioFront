import { TestBed } from '@angular/core/testing';

import { FormAlumnoService } from './form-alumno.service';

describe('FormAlumnoService', () => {
  let service: FormAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
