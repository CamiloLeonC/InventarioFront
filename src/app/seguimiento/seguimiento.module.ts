import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { SeguimientoComponent } from './components/seguimiento.component';
// import { NuevoSeguimientoComponent } from './components/nuevo-seguimiento/nuevo-seguimiento.component';
// import { NuevoProfesorComponent } from './components/nuevo-profesor/nuevo-profesor.component';


@NgModule({
  declarations: [
    SeguimientoComponent,
    // NuevoSeguimientoComponent,
    // NuevoProfesorComponent
  ],
  imports: [
    CommonModule,
    SeguimientoRoutingModule
  ]
})
export class SeguimientoModule { }
