import { CurrencyPipe } from '@angular/common';

//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


//Componentes
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/components/login.component';
import { UsuarioComponent } from './usuario/components/usuario.component';


//Componentes de formularios
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../app/shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { ErrorInterceptor, httpInterceptorProviders } from './_helpers';
import { AuthInterceptorService } from './auth-interceptor.service';
import { NavbarComponent } from './navbar/components/navbar.component';
import { EquipoComponent } from './equipo/components/equipo.component';
import { ContratoComponent } from './contrato/components/contrato.component';
import { SeguimientoComponent } from './seguimiento/components/seguimiento.component';
import { EntregaDevolucionComponent } from './entregaDevolucion/components/entregaDevolucion.component';
import { FormEquipoComponent } from './equipo/components/form-equipo.component';
import { FormSeguimientoComponent } from './seguimiento/components/form-seguimiento.component';
import { FormContratoComponent } from './contrato/components/form-contrato.component';
import { FormEntregaDevolucionComponent } from './entregaDevolucion/components/form-entregaDevolucion.component';
import { FormUsuarioComponent } from './usuario/components/form-usuario.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UsuarioComponent,
    EquipoComponent,
    ContratoComponent,
    SeguimientoComponent,
    EntregaDevolucionComponent,
    FormEquipoComponent,
    FormSeguimientoComponent,
    FormContratoComponent,
    FormEntregaDevolucionComponent,    
    FormUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    SharedModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },    
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
