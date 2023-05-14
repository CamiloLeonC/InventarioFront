import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormEntregaDevolucionRoutingModule } from './form-entregaDevolucion-routing.module';
import { FormEntregaDevolucionComponent } from './components/form-entregaDevolucion.component';


@NgModule({
  declarations: [
    FormEntregaDevolucionComponent
  ],
  imports: [
    CommonModule,
    FormEntregaDevolucionRoutingModule
  ]
})
export class FormEntregaDevolucionModule { }
