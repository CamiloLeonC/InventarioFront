import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormNotasRoutingModule } from './form-notas-routing.module';
import { FormNotaComponent } from './components/form-notas.component';


@NgModule({
  declarations: [
    FormNotaComponent
  ],
  imports: [
    CommonModule,
    FormNotasRoutingModule
  ]
})
export class FormNotasModule { }
