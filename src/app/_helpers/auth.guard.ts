import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { JwtDecodeTokenService } from '../modulos/jwtdecodetoken.service';
import { SeguridadService } from '../modulos/seguridad.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    private funcionalidades: any[] = [];

    constructor(private router: Router,
        private http: HttpClient,
        // private snackBar: MatSnackBar,
        private seguridadService: SeguridadService,
        private jwtDecodeTokenService: JwtDecodeTokenService,
        private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const currentUser = this.authenticationService.currentUserValue;
        let val = false;

        if (currentUser) {

            if (state.url.endsWith('/')) {
                this.router.navigate(['/Solin']);
                return of(true);

            } else
                if (state.url.endsWith('/Solin')) {
                    return of(true);

                } else if (this.funcionalidades.length === 0) {

                    let sUrl = `${environment.AppUrl}/general/GetAllClaimsForUser`;

                    return this.http.get<any>(sUrl).pipe(
                        tap(() => this.log("fetched SimPermisos")),
                        map(data => {
                            val = this.hasClaim(data, state.url, "");
                            // if (!val) {
                            //     this.router.navigate(['/Solin']);
                            //     this.seguridadService.setCurrentHome(false);
                            //     this.openNotificationDanger('Acceso inválido');
                            // };
                            return val;
                        }),
                        catchError((error) => this.handleError("GetAllClaimsForUser", error))
                    );

                } else {
                    this.funcionalidades.forEach(func => {
                        if (state.url.endsWith(func.nombre)) {
                            val = true;
                            return true;
                        };
                        return false;
                    });

                    // if (!val) {
                    //     this.router.navigate(['/Solin']);
                    //     this.seguridadService.setCurrentHome(false);
                    //     this.openNotificationDanger('Acceso inválido');
                    // };
                    return of(val);
                };

        } else if (state.url.endsWith('/')) {
            return of(true);
        };

        // not logged in so redirect to login page with the return url
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = `${environment.AppUrl}`;
        return of(val);
    }

    hasClaim(tree: any[], url: string, padre:string): boolean {
        //for si tiene hijos, si es así que termine en el nombreClase
        for(let child of tree){
            if ((child.children === undefined || child.children.length === 0) && url.endsWith(child.nombreClase)){
                this.seguridadService.setCurrentHome(true);
                sessionStorage.setItem('grupo', child.fullPath);
                sessionStorage.setItem('funcionalidad', child.descripcion);
                return true;
            }else if (child.children !== undefined && child.children.length > 0 && this.hasClaim(child.children, url, padre))
                return true;
        };
        return false;
    }

    // openNotificationDanger(message: string, action?: string) {
    //     this.snackBar.open(message, action, {
    //         duration: 2000,
    //         panelClass: 'dangerSnackBar',
    //     });
    // }

    private handleError(operation = "operation", result?: any) {

        // TODO: send the error to remote logging infrastructure
        console.error(result.message); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${result.message}`);

        // Let the app keep running by returning an empty result.
        return of(result);
    }

    /** Log a AuthGuard message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`AuthGuard: ${message}`);
        console.log(`AuthGuard: ${message}`);
    }
}