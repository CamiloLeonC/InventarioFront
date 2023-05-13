import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MateriaProfesorService {
  private AppUrl = environment.AppUrl;
  private ApiUrl = '/api/MateriaProfesor'
  
  constructor(private http: HttpClient) { }

  // private actualizarForm = new BehaviorSubject<MateriaProfesorModel>

  getListMateriaProfesors(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`;
    const params: any = {};
    params["$expand"] = "ApplicationUser,Materia";
    return this.http.get<any>(Urls,{params}).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  getById(id: number): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;

    return this.http.get<any>(sUrl).pipe(
      tap(() => this.log("fetched Materia")),
      catchError((error) => this.handleError("getMateria", error))
    );
  }

  deleteMateriaProfesor(id: number): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;

    return this.http.delete(sUrl).pipe(
      tap(_ => this.log(`filter SimMateriaProfesor id=${id}`)),
      catchError((error) => this.handleError("deleteSimMateriaProfesor", error))
    );
  }

  saveMateriaProfesor(materiaprofesor: any): Observable<any> {
    return this.http.post(this.AppUrl + this.ApiUrl, materiaprofesor);
  }

  updateMateriaProfesor(id: number, materiaprofesor: any): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.put(sUrl, materiaprofesor);
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
    console.log(`mATERIApROFESORsERVICE: ${message}`);
  }
}
