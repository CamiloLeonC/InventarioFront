import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoRoutingModule } from './curso-routing.module';
import { GrupoComponent } from './components/grupo.component';


@NgModule({
  declarations: [
    GrupoComponent
  ],
  imports: [
    CommonModule,
    CursoRoutingModule
  ]
})
export class CursoModule { }
