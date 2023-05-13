import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormCursoRoutingModule } from './form-curso-routing.module';
import { FormGrupoComponent } from './components/form-grupo.component';


@NgModule({
  declarations: [
    FormGrupoComponent
  ],
  imports: [
    CommonModule,
    FormCursoRoutingModule
  ]
})
export class FormCursoModule { }
