import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { UsuarioComponent } from './usuario/components/usuario.component';
import { UserGuardGuard } from './user-guard.guard';
import { FormUsuarioComponent } from './usuario/components/form-usuario.component';
import { ContratoComponent } from './contrato/components/contrato.component';
import { FormContratoComponent } from './contrato/components/form-contrato.component';
import { EquipoComponent } from './equipo/components/equipo.component';
import { FormEquipoComponent } from './equipo/components/form-equipo.component';
import { SeguimientoComponent } from './seguimiento/components/seguimiento.component';
import { FormSeguimientoComponent } from './seguimiento/components/form-seguimiento.component';
import { EntregaDevolucionComponent } from './entregaDevolucion/components/entregaDevolucion.component';
import { FormEntregaDevolucionComponent } from './entregaDevolucion/components/form-entregaDevolucion.component';



const routes: Routes = [
  {
    path:'', redirectTo: 'login', pathMatch:'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'usuario', component:UsuarioComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-usuario', component:FormUsuarioComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-usuario/:id', component:FormUsuarioComponent, canActivate: [UserGuardGuard]
  },
  //Contrato
  {
    path:'contrato', component:ContratoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-contrato', component:FormContratoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-contrato/:id', component:FormContratoComponent, canActivate: [UserGuardGuard]
  },
  //Equipo
  {
    path:'equipo', component:EquipoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-equipo', component:FormEquipoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-equipo/:id', component:FormEquipoComponent, canActivate: [UserGuardGuard]
  },
  //Seguimiento
  {
    path:'seguimiento', component:SeguimientoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-seguimiento', component:FormSeguimientoComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-seguimiento/:id', component:FormSeguimientoComponent, canActivate: [UserGuardGuard]
  },

  //EntregaDevolucion
  {
    path:'entregadevolucion', component:EntregaDevolucionComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-entregadevolucion', component:FormEntregaDevolucionComponent, canActivate: [UserGuardGuard]
  },
  {
    path:'form-update-entregadevolucion/:id', component:FormEntregaDevolucionComponent, canActivate: [UserGuardGuard]
  },
  
  {
    path:'**', redirectTo: 'login', pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
