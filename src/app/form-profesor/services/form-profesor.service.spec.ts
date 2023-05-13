import { TestBed } from '@angular/core/testing';

import { FormProfesorService } from './form-profesor.service';

describe('FormProfesorService', () => {
  let service: FormProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
