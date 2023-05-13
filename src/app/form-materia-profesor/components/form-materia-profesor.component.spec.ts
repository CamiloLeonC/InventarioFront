// import { TestBed } from "@angular/core/testing";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ToastrModule } from "ngx-toastr";
// import { RouterTestingModule } from "@angular/router/testing";
// import { FormMateriaProfesorComponent } from "./form-materia-profesor.component";



// describe('Form MateriaProfesor Component', () => {

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule,
//         HttpClientTestingModule,
//         FormsModule,RouterTestingModule,
//         ToastrModule.forRoot()],
//       declarations: [FormMateriaProfesorComponent]
//     })
//       .compileComponents();
//   });

//   it('should create MateriaProfesor', () => {
//     const fixture = TestBed.createComponent(FormMateriaProfesorComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });

//   //VALIDAR QUE CADA CAMPO ES REQUERIDO, POR LO CAL SI ES INVALIDO DEBE RETORNAR TRUE

//   it('Profesor should be invalid ', () => {
//     const fixture = TestBed.createComponent(FormMateriaProfesorComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges();
//     const profesor = component.createMateriaProfesor.controls['profesor']
//     profesor.setValue('')
//     expect(profesor.invalid).toBeTrue();
//   });

//   it('materiaprofesor should be invalid ', () => {
//     const fixture = TestBed.createComponent(FormMateriaProfesorComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges()
//     const materiaprofesor = component.createMateriaProfesor.controls['materiaprofesor']
//     materiaprofesor.setValue('')
//     expect(materiaprofesor.invalid).toBeTrue();
//   });

// });
