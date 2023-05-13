import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormMateriaRoutingModule } from './form-materia-routing.module';
import { FormMateriaComponent } from './components/form-materia.component';


@NgModule({
  declarations: [
    FormMateriaComponent
  ],
  imports: [
    CommonModule,
    FormMateriaRoutingModule
  ]
})
export class FormMateriaModule { }
