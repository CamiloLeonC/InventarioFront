import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno/components/alumno.component';
import { UsuarioComponent } from './usuario/components/usuario.component';
import { GrupoComponent } from './curso/components/grupo.component';
import { FormAlumnoComponent } from './form-alumno/components/form-alumno.component';
import { FormUsuarioComponent } from './usuario/components/form-usuario.component';
import { FormGrupoComponent } from './form-curso/components/form-grupo.component';
import { FormMateriaProfesorComponent } from './form-materia-profesor/components/form-materia-profesor.component';
import { FormMateriaComponent } from './form-materia/components/form-materia.component';
import { FormNotaComponent } from './form-notas/components/form-notas.component';
import { FormProfesorComponent } from './form-profesor/components/form-profesor.component';
import { LoginComponent } from './login/components/login.component';
import { InicioComponent } from './eee/components/inicio.component';
import { MateriaProfesorComponent } from './materia-profesor/components/materia-profesor.component';
import { MateriaComponent } from './materia/components/materia.component';
import { NotaComponent } from './nota/components/nota.component';
import { ProfesorComponent } from './profesor/components/profesor.component';
import { UserGuardGuard } from './user-guard.guard';

const routes: Routes = [
  {
    path:'', redirectTo: 'login', pathMatch:'full'
  },
  {
    path:'login', component:LoginComponent
  },
  // {
  //   path:'inicio', component:InicioComponent
  // },
  {
    path:'nota', component:NotaComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'alumno', component:AlumnoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'usuario', component:UsuarioComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'profesor', component:ProfesorComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'materia', component:MateriaComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'materia-profesor', component:MateriaProfesorComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'grupo', component:GrupoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-alumno', component:FormAlumnoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-alumno/:id', component:FormAlumnoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-usuario', component:FormUsuarioComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-usuario/:id', component:FormUsuarioComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-grupo', component:FormGrupoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-grupo/:id', component:FormGrupoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-profesor', component:FormProfesorComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-profesor/:id', component:FormProfesorComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-notas', component:FormNotaComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-notas/:id', component:FormNotaComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-materia', component:FormMateriaComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-materia/:id', component:FormMateriaComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-materia-profesor', component:FormMateriaProfesorComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-materia-profesor/:id', component:FormMateriaProfesorComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'**', redirectTo: 'nota', pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
