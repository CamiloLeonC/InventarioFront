import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './components/usuario.component';
// import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
// import { NuevoProfesorComponent } from './components/nuevo-profesor/nuevo-profesor.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    // NuevoUsuarioComponent,
    // NuevoProfesorComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
