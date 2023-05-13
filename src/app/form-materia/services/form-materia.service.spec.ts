import { TestBed } from '@angular/core/testing';

import { FormMateriaService } from './form-materia.service';

describe('FormMateriaService', () => {
  let service: FormMateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
