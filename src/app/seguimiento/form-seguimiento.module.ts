import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSeguimientoRoutingModule } from './form-seguimiento-routing.module';
import { FormSeguimientoComponent } from './components/form-seguimiento.component';


@NgModule({
  declarations: [
    FormSeguimientoComponent
  ],
  imports: [
    CommonModule,
    FormSeguimientoRoutingModule
  ]
})
export class FormSeguimientoModule { }
