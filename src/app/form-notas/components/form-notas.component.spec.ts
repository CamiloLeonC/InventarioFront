// import { TestBed } from "@angular/core/testing";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ToastrModule } from 'ngx-toastr';
// import { FormNotaComponent } from "./form-notas.component";
// import { RouterTestingModule } from "@angular/router/testing";



// describe('FormNotaComponent', () => {

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule,
//         HttpClientTestingModule,
//         FormsModule,RouterTestingModule,
//         ToastrModule.forRoot()],
//       declarations: [FormNotaComponent]
//     })
//       .compileComponents();
//   });


//   it('should create', () => {
//     const fixture = TestBed.createComponent(FormNotaComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });


//   //VALIDAR QUE CADA CAMPO ES REQUERIDO, POR LO CAL SI ES INVALIDO DEBE RETORNAR TRUE

 
//   it('Acudiente should be invalid ', () => {
//     const fixture = TestBed.createComponent(FormNotaComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges()
//     const nombreAcudiente = component.createNota.controls['nombreAcudiente']
//     nombreAcudiente.setValue(' +ÁS')
//     expect(nombreAcudiente.invalid).not.toBeTruthy();
//   });

//   it('Numero Acudiente should be invalid ', () => {
//     const fixture = TestBed.createComponent(FormNotaComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges()
//     const numeroAcudiente = component.createNota.controls['numeroAcudiente']
//     numeroAcudiente.setValue(' +ÁS')
//     expect(numeroAcudiente.invalid).not.toBeTruthy();
//   });

//   it('form should return valid', () => {
//     const fixture = TestBed.createComponent(FormNotaComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges()
//     // let form = component createNota
//     let materiaPorProfesor = component.createNota.controls['materiaPorProfesor']
//     let alumno = component.createNota.controls['alumno']
//     let periodo = component.createNota.controls['periodo']
//     let notaSaber = component.createNota.controls['notaSaber']
//     let notaHacer = component.createNota.controls['notaHacer']
//     let notaSer = component.createNota.controls['notaSer']
//     let definitivaTotal = component.createNota.controls['definitivaTotal']
//     let observaciones = component.createNota.controls['observaciones']

//     materiaPorProfesor.setValue('1')
//     alumno.setValue('2')
//     periodo.setValue('COL')
//     notaSaber.setValue('CO')
//     notaHacer.setValue('debeserunorreo@mail.com')
//     notaSer.setValue('co')
//     definitivaTotal.setValue('Colombia')
//     observaciones.setValue(true)
//     expect(component.createNota.invalid).toBeFalse();
//   })

// });
