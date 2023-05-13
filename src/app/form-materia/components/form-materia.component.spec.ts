import { TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from "ngx-toastr";
import { FormMateriaComponent } from "./form-materia.component";
import { RouterTestingModule } from "@angular/router/testing";



describe('Form Materia Component', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,RouterTestingModule,
        ToastrModule.forRoot()],
      declarations: [FormMateriaComponent]
    })
      .compileComponents();
  });

  it('should create Materia', () => {
    const fixture = TestBed.createComponent(FormMateriaComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  //VALIDAR QUE CADA CAMPO ES REQUERIDO, POR LO CAL SI ES INVALIDO DEBE RETORNAR TRUE

  it('Nombre should be invalid ', () => {
    const fixture = TestBed.createComponent(FormMateriaComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const nombre = component.createMateria.controls['nombre']
    nombre.setValue('')
    expect(nombre.invalid).toBeTrue();
  });

  it('Id materia should be invalid ', () => {
    const fixture = TestBed.createComponent(FormMateriaComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const descripcion = component.createMateria.controls['descripcion']
    descripcion.setValue('')
    expect(descripcion.invalid).toBeTrue();
  });

});
