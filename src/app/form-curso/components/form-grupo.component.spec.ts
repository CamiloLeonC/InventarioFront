// import { TestBed } from "@angular/core/testing";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormGrupoComponent } from "./form-grupo.component";
// import { ToastrModule } from "ngx-toastr";



// describe('Form Grupo Component', () => {

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule,
//         HttpClientTestingModule,
//         FormsModule,
//         ToastrModule.forRoot()],
//       declarations: [FormGrupoComponent]
//     })
//       .compileComponents();
//   });

//   it('should create Grupo', () => {
//     const fixture = TestBed.createComponent(FormGrupoComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });

//   //VALIDAR QUE CADA CAMPO ES REQUERIDO, POR LO CAL SI ES INVALIDO DEBE RETORNAR TRUE

//   it('Curso should be invalid ', () => {
//     const fixture = TestBed.createComponent(FormGrupoComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges();
//     const curso = component.createGrupo.controls['curso']
//     curso.setValue('')
//     expect(curso.invalid).not.toBeTruthy();
//   });

//   it('Id grupo should be invalid ', () => {
//     const fixture = TestBed.createComponent(FormGrupoComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges()
//     const grado = component.createGrupo.controls['grado']
//     grado.setValue('')
//     expect(grado.invalid).not.toBeTrue();
//   });

// });
