import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaRoutingModule } from './nota-routing.module';
import { NotaComponent } from './components/nota.component';


@NgModule({
  declarations: [
    NotaComponent
  ],
  imports: [
    CommonModule,
    NotaRoutingModule
  ]
})
export class NotaModule { }
