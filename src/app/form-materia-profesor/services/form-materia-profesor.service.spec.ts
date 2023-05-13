import { TestBed } from '@angular/core/testing';

import { FormMateriaProfesorService } from './form-materia-profesor.service';

describe('FormMateriaProfesorService', () => {
  let service: FormMateriaProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMateriaProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
