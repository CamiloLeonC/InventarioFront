import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private AppUrl = environment.AppUrl;
  private ApiUrl = '/api/Nota'
  // constructor(private firestore: AngularFirestore) {}
  constructor(private http: HttpClient) { }

  getListNotas(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`;

    const params: any = {};
    params["$expand"] = "ApplicationUser, MateriaProfesor($expand=Materia,ApplicationUser)";
    return this.http.get<any>(Urls, { params }).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  getById(id: number): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.get<any>(Urls).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  deleteNota(id: number): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;

    return this.http.delete(sUrl).pipe(
      tap(_ => this.log(`filter SimNota id=${id}`)),
      catchError((error) => this.handleError("deleteSimNota", error))
    );
  }

  saveNota(nota: any): Observable<any> {
    return this.http.post(this.AppUrl + this.ApiUrl, nota);
  }

  updateNota(id: number, nota: any): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.put(sUrl, nota);
  }

  cargarFormatoExcel(archivo: File): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/CargarExcel`;
    const formData: FormData = new FormData();
    formData.append('file', archivo, archivo.name);

    return this.http.post<any>(sUrl, formData).pipe(
        tap(() => this.log(`fetched CargarExcel`)),
        catchError((error) => this.handleError('addCargarExcel', error))
    );
  }

  onExportNotas(): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/ExportarNotas`;

    return this.http.get(sUrl, { responseType: 'blob' }).pipe(
      map((result: any) => {
        return result;
      }),
      tap(() => this.log('exportarAuditoria')),
      catchError((error) => this.handleError('exportarAuditoria', error))
    );
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