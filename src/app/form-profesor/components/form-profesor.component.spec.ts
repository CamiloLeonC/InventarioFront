import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormAlumnoComponent } from "src/app/form-alumno/components/form-alumno.component";
import { TestBed } from "@angular/core/testing";



describe('FormAlumnoComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        ToastrModule.forRoot()],
      declarations: [FormAlumnoComponent]
    })
      .compileComponents();
  });


  it('should create', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  //VALIDAR QUE CADA CAMPO ES REQUERIDO, POR LO CAL SI ES INVALIDO DEBE RETORNAR TRUE

  it('Nombre Completo should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const nombreCompleto = component.createAlumno.controls['nombreCompleto']
    nombreCompleto.setValue('+¨- 5')
    expect(nombreCompleto.invalid).not.toBeTruthy();
  });

  it('Id grupo should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const idGrupo = component.createAlumno.controls['idGrupo']
    idGrupo.setValue(' +ÁS')
    expect(idGrupo.invalid).not.toBeTruthy();
  });

  it('Jornada should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const jornada = component.createAlumno.controls['jornada']
    jornada.setValue(' +ÁS')
    expect(jornada.invalid).not.toBeTruthy();
  });

  it('Tipo sangre should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const tipoSangre = component.createAlumno.controls['tipoSangre']
    tipoSangre.setValue(' +ÁS')
    expect(tipoSangre.invalid).not.toBeTruthy();
  });

  it('Nombre should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const correo = component.createAlumno.controls['correo']
    correo.setValue(' +ÁS@mail.com')
    expect(correo.invalid).toBeTrue();
  });

  it('Correo should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const documento = component.createAlumno.controls['documento']
    documento.setValue(' +ÁS')
    expect(documento.invalid).not.toBeTruthy();
  });

  it('Documento should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const nombreAcudiente = component.createAlumno.controls['nombreAcudiente']
    nombreAcudiente.setValue(' +ÁS')
    expect(nombreAcudiente.invalid).not.toBeTruthy();
  });

  it('Grupo should be invalid ', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    const numeroAcudiente = component.createAlumno.controls['numeroAcudiente']
    numeroAcudiente.setValue(' +ÁS')
    expect(numeroAcudiente.invalid).not.toBeTruthy();
  });

  it('form should return valid', () => {
    const fixture = TestBed.createComponent(FormAlumnoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges()
    // let form = component createAlumno
    let nombreCompleto = component.createAlumno.controls['nombreCompleto']
    let idGrupo = component.createAlumno.controls['idGrupo']
    let jornada = component.createAlumno.controls['jornada']
    let tipoSangre = component.createAlumno.controls['tipoSangre']
    let correo = component.createAlumno.controls['correo']
    let documento = component.createAlumno.controls['documento']
    let nombreAcudiente = component.createAlumno.controls['nombreAcudiente']
    let numeroAcudiente = component.createAlumno.controls['numeroAcudiente']

    nombreCompleto.setValue('1')
    idGrupo.setValue('2')
    jornada.setValue('COL')
    tipoSangre.setValue('CO')
    correo.setValue('debeserunorreo@mail.com')
    documento.setValue('co')
    nombreAcudiente.setValue('Colombia')
    numeroAcudiente.setValue(true)
    expect(component.createAlumno.invalid).toBeFalse();
  })

});