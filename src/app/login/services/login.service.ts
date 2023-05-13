import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class loginService {
  private loginUrl = '';  // URL to web api
  public isLogin = false;
  public token = '';

  constructor(private http: HttpClient) {
    this.loginUrl = `${environment.AppUrl}/odata/ApplicationUserLogin`;
  }

  login(row: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, row).pipe(
      catchError((error) => this.handleError('Login', error))
    );
  }

  logout(): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    const sUrl = `${this.loginUrl}/revoke`;

    return this.http.post<any>(sUrl, {}, {headers}).pipe(
      tap((resp: HttpResponse<any>) => {
        this.log(`login w/ id=${resp.body.username}`);
        return resp;
      }),
      catchError((error) => this.handleError('logout', error))
    );
  }

  // recuperarClave(correo: string, dispositivo: string): Observable<any> {
  //   let sUrl = `${environment.AppUrl}/odata/ApplicationUser/Recuperar?correo=${correo}&dispositivo=${dispositivo}`;

  //   return this.http.get<any>(sUrl).pipe(
  //       tap((row: any) => this.log(`fetched LoginRecuperacionClave`)),
  //       catchError((error) => this.handleError('addLoginRecuperacionClave', error))
  //   );
  // }

  private handleError(operation = 'operation', result?: any) {

    // TODO: send the error to remote logging infrastructure
    console.log(result.error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${result.message}`);

    // Let the app keep running by returning an empty result.
    return of(result);
  }

  /** Log a INVCO_BienesService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`loginService: ${message}`);
    console.log(`LoginService: ${message}`);
  }

}
