import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './components/contrato.component';
// import { NuevoContratoComponent } from './components/nuevo-contrato/nuevo-contrato.component';
// import { NuevoProfesorComponent } from './components/nuevo-profesor/nuevo-profesor.component';


@NgModule({
  declarations: [
    ContratoComponent,
    // NuevoContratoComponent,
    // NuevoProfesorComponent
  ],
  imports: [
    CommonModule,
    ContratoRoutingModule
  ]
})
export class ContratoModule { }
