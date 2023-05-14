import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { EquipoComponent } from './components/equipo.component';
// import { NuevoEquipoComponent } from './components/nuevo-equipo/nuevo-equipo.component';
// import { NuevoProfesorComponent } from './components/nuevo-profesor/nuevo-profesor.component';


@NgModule({
  declarations: [
    EquipoComponent,
    // NuevoEquipoComponent,
    // NuevoProfesorComponent
  ],
  imports: [
    CommonModule,
    EquipoRoutingModule
  ]
})
export class EquipoModule { }
