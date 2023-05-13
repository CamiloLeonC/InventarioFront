import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriaRoutingModule } from './materia-routing.module';
import { MateriaComponent } from './components/materia.component';


@NgModule({
  declarations: [
    MateriaComponent
  ],
  imports: [
    CommonModule,
    MateriaRoutingModule
  ]
})
export class MateriaModule { }
