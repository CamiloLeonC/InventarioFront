import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormMateriaProfesorRoutingModule } from './form-materia-profesor-routing.module';
import { FormMateriaProfesorComponent } from './components/form-materia-profesor.component';


@NgModule({
  declarations: [
    FormMateriaProfesorComponent
  ],
  imports: [
    CommonModule,
    FormMateriaProfesorRoutingModule
  ]
})
export class FormMateriaProfesorModule { }
