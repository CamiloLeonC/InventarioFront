import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormContratoRoutingModule } from './form-contrato-routing.module';
import { FormContratoComponent } from './components/form-contrato.component';


@NgModule({
  declarations: [
    FormContratoComponent
  ],
  imports: [
    CommonModule,
    FormContratoRoutingModule
  ]
})
export class FormContratoModule { }
