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
    'usuario',
    'contrato',
    'equipo',
    'seguimiento',
    'entregadevolucion',

    'form-usuario',
    'form-contrato',
    'form-equipo',
    'form-seguimiento',
    'form-entregadevolucion',

    'form-update-usuario',
    'form-update-contrato',
    'form-update-equipo',
    'form-update-seguimiento',
    'form-update-entregadevolucion'
  ];
  private _permisosDocente: string[] = [
    "equipo", 
    
  ];

  private _permisosAlumno: string[] = [     
    "seguimiento", 
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
          case 'AuxBodega':
            this._permisosDocente.forEach(element => {
              if (ruta[1] === element) {
                respuesta = true;
              }
            });
            break;
          case 'Empleado':
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


