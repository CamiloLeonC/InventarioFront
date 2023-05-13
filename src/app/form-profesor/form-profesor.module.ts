import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormProfesorRoutingModule } from './form-profesor-routing.module';
import { FormProfesorComponent } from './components/form-profesor.component';


@NgModule({
  declarations: [
    FormProfesorComponent
  ],
  imports: [
    CommonModule,
    FormProfesorRoutingModule
  ]
})
export class FormProfesorModule { }
