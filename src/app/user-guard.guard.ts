import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  private _permisosAdmin: string[] = [
    "alumno", 
    "usuario", 
    "profesor", 
    "materia", 
    "materia-profesor", 
    "grupo", 
    "nota", 
    "notaAlumno", 
    "form-alumno", 
    "form-update-alumno", 
    "form-usuario", 
    "form-update-usuario", 
    "form-grupo", 
    "form-update-grupo",
    "form-profesor", 
    "form-update-profesor", 
    "form-nota", 
    "form-update-notas",
    "form-materia", 
    "form-update-materia", 
    "form-materia-profesor", 
    "form-update-materia-profesor", 
  ];
  private _permisosDocente: string[] = [
    "alumno", 
    "materia", 
    "materia-profesor", 
    "grupo", 
    "nota", 
    "notaAlumno", 
    "form-alumno", 
    "form-update-alumno", 
    "form-grupo", 
    "form-profesor", 
    "form-nota", 
    "form-update-notas",
    "form-materia", 
    "form-materia-profesor", 
    
  ];

  private _permisosAlumno: string[] = [     
    "nota", 
  ];


  constructor(private router: Router,
    private snackBar: MatSnackBar) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let ruta = window.location.pathname.split('/');


    const token: string = sessionStorage.getItem('token')!;
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      if(ruta[1] !== 'login') {
        let respuesta: boolean = false;
        let data: any = jwt_decode(token);
        switch (data.rol) {
          case 'Administrador':
            this._permisosAdmin.forEach(element => {
              if (ruta[1] === element) {
                respuesta = true;
              }
            });
            break;
          case 'Docente':
            this._permisosDocente.forEach(element => {
              if (ruta[1] === element) {
                respuesta = true;
              }
            });
            break;
          case 'Alumno':
            this._permisosAlumno.forEach(element => {
              if (ruta[1] === element) {
                respuesta = true;
              }
            });
            break;
        }
        if(!respuesta){
          this.router.navigate(['/login']);
          this.openNotificationDanger('Acceso inválido');
        }
        return respuesta;
      } else{
        return true;
      }      
    }
  }



  openNotificationDanger(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'dangerSnackBar',
    });
  }
}


