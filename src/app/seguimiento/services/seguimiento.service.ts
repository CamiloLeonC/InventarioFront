import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root',
})
export class SeguimientoService {
  private AppUrl = environment.AppUrl;
  private ApiUrl = '/api/ApplicationUser'
  private ApiRolesUrl = '/api/ApplicationRole'
  // constructor(private firestore: AngularFirestore) {}
  constructor(private http: HttpClient) { }

  getListSeguimientos(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`;
    const params: any={};
    params["expand"]="Grupo";
    return this.http.get<any>(Urls, {params}).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  
  getListEmpleado(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`;
    const params: any={};

    params["$filter"]="Roles/any(x: x/Role/Name eq 'Empleado')";
    params["$select"]="Id,NombreCompleto";

    return this.http.get<any>(Urls, {params}).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  getListAuxiliarBodega(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`;
    const params: any={};

    params["$filter"]="Roles/any(x: x/Role/Name eq 'AuxiliarBodega')";
    params["$select"]="Id,NombreCompleto";

    return this.http.get<any>(Urls, {params}).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  getListRoles(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiRolesUrl}`;
    return this.http.get<any>(Urls).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  getById(id: string): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.get<any>(Urls).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  getUserRoles(id: string): Observable<any> {
    const Urls = `${this.AppUrl}/api/RolForUser/${id}`;

    return this.http.get<any>(Urls).pipe(
        tap(row => this.log('fetched RoleForUser')),
        catchError((error) => this.handleError('getRoleForUserList', error))
    );
}

  deleteSeguimiento(id: number): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;

    return this.http.delete(sUrl).pipe(
      tap(_ => this.log(`filter SimSeguimiento id=${id}`)),
      catchError((error) => this.handleError("deleteSeguimiento", error))
    );
  }

  saveSeguimiento(seguimiento: any): Observable<any> {
    return this.http.post(this.AppUrl + this.ApiUrl, seguimiento);
  }

  updateSeguimiento(id: string, seguimiento: any): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.put(sUrl, seguimiento);
  }
  private handleError(operation = "operation", result?: any) {

    // TODO: send the error to remote logging infrastructure
    console.error(result.message); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${result.message}`);

    // Let the app keep running by returning an empty result.
    return of(result);
  }
  /** Log a TipoSuscripcionService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`TipoSuscripcionService: ${message}`);
    console.log(`TipoSuscripcionService: ${message}`);
  }
}
