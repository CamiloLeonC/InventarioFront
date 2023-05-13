import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormAlumnoRoutingModule } from './form-alumno-routing.module';
import { FormAlumnoComponent } from './components/form-alumno.component';


@NgModule({
  declarations: [
    FormAlumnoComponent
  ],
  imports: [
    CommonModule,
    FormAlumnoRoutingModule
  ]
})
export class FormAlumnoModule { }
