import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriaProfesorRoutingModule } from './materia-profesor-routing.module';
import { MateriaProfesorComponent } from './components/materia-profesor.component';


@NgModule({
  declarations: [
    MateriaProfesorComponent
  ],
  imports: [
    CommonModule,
    MateriaProfesorRoutingModule
  ]
})
export class MateriaProfesorModule { }
