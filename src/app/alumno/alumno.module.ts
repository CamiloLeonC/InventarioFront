import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './components/alumno.component';
// import { NuevoAlumnoComponent } from './components/nuevo-alumno/nuevo-alumno.component';
// import { NuevoProfesorComponent } from './components/nuevo-profesor/nuevo-profesor.component';


@NgModule({
  declarations: [
    AlumnoComponent,
    // NuevoAlumnoComponent,
    // NuevoProfesorComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule
  ]
})
export class AlumnoModule { }
