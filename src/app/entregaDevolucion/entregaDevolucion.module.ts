import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregaDevolucionRoutingModule } from './entregaDevolucion-routing.module';
import { EntregaDevolucionComponent } from './components/entregaDevolucion.component';
// import { NuevoEntregaDevolucionComponent } from './components/nuevo-entregadevolucion/nuevo-entregadevolucion.component';
// import { NuevoProfesorComponent } from './components/nuevo-profesor/nuevo-profesor.component';


@NgModule({
  declarations: [
    EntregaDevolucionComponent,
    // NuevoEntregaDevolucionComponent,
    // NuevoProfesorComponent
  ],
  imports: [
    CommonModule,
    EntregaDevolucionRoutingModule
  ]
})
export class EntregaDevolucionModule { }
