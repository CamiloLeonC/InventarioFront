import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormEquipoRoutingModule } from './form-equipo-routing.module';
import { FormEquipoComponent } from './components/form-equipo.component';


@NgModule({
  declarations: [
    FormEquipoComponent
  ],
  imports: [
    CommonModule,
    FormEquipoRoutingModule
  ]
})
export class FormEquipoModule { }
