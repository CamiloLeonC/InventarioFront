import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  private AppUrl = environment.AppUrl;
  private ApiUrl = '/api/Contratos'
  // constructor(private firestore: AngularFirestore) {}
  constructor(private http: HttpClient) { }

  getListContratos(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`;
    const params: any={};
    params["expand"]="Equipo";
    return this.http.get<any>(Urls, {params}).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  getById(Id: number): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}/${Id}`;
    return this.http.get<any>(Urls).pipe(
      tap(row => this.log('fetched Contrato')),
      catchError((error) => this.handleError('getContrato', error))
    );
  }

  deleteContrato(id: number): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;

    return this.http.delete(sUrl).pipe(
      tap(_ => this.log(`filter SimContrato id=${id}`)),
      catchError((error) => this.handleError("deleteContrato", error))
    );
  }

  saveContrato(contrato: any): Observable<any> {
    return this.http.post(this.AppUrl + this.ApiUrl, contrato);
  }

  updateContrato(id: number, contrato: any): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.put(sUrl, contrato);
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
