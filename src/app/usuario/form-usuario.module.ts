import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormUsuarioRoutingModule } from './form-usuario-routing.module';
import { FormUsuarioComponent } from './components/form-usuario.component';


@NgModule({
  declarations: [
    FormUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormUsuarioRoutingModule
  ]
})
export class FormUsuarioModule { }
