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

import { UsuarioComponent } from './usuario/components/usuario.component';
import { AlumnoComponent } from './alumno/components/alumno.component';
import { GrupoComponent } from './curso/components/grupo.component';
import { LoginComponent } from './login/components/login.component';
import { InicioComponent } from './eee/components/inicio.component';
import { MateriaProfesorComponent } from './materia-profesor/components/materia-profesor.component';
import { MateriaComponent } from './materia/components/materia.component';
import { NavbarComponent } from './navbar/components/navbar.component';
import { NotaComponent } from './nota/components/nota.component';
import { ProfesorComponent } from './profesor/components/profesor.component';
//Componentes de formularios
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormAlumnoComponent } from './form-alumno/components/form-alumno.component';
import { FormUsuarioComponent } from './usuario/components/form-usuario.component';
import { FormProfesorComponent } from './form-profesor/components/form-profesor.component';
import { FormNotaComponent,  } from './form-notas/components/form-notas.component';
import { FormMateriaComponent } from './form-materia/components/form-materia.component';
import { FormMateriaProfesorComponent } from './form-materia-profesor/components/form-materia-profesor.component';
import { FormGrupoComponent } from './form-curso/components/form-grupo.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../app/shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { ErrorInterceptor, httpInterceptorProviders } from './_helpers';
import { AuthInterceptorService } from './auth-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    InicioComponent,
    AlumnoComponent,
    UsuarioComponent,
    ProfesorComponent,
    GrupoComponent,
    NotaComponent,
    MateriaComponent,
    MateriaProfesorComponent,
    NotaComponent,
    GrupoComponent,
    FormGrupoComponent,
    FormAlumnoComponent,
    FormUsuarioComponent,
    FormProfesorComponent,
    FormMateriaComponent,
    FormMateriaProfesorComponent,
    FormNotaComponent,
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
