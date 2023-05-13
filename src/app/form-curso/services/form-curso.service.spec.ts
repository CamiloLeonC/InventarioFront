import { TestBed } from '@angular/core/testing';

import { FormCursoService } from './form-curso.service';

describe('FormCursoService', () => {
  let service: FormCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
