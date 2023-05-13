import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { User } from '../_helpers/user';

@Injectable({ providedIn: 'root' })
export class JwtDecodeTokenService {
  private permisosUrl = '';
  private currentPermisosSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private currentUserSubject: BehaviorSubject<User | null>;
  constructor(private http: HttpClient) {
    let user = null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
  }

  getUsuario(): Observable<any> {
    let _usuario;
    try {
      let currentUser: any = JSON.parse(localStorage.getItem('currentUser')!);
      let data = jwt_decode(currentUser.token);

    } catch (error) {
      _usuario = {};
    };
    return of(_usuario);
  }

  getRole(): Observable<any> {
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser')!);
    let data: any = jwt_decode(currentUser.token);
    return of(data.rol);
  }

  private handleError(operation = "operation", result?: any) {

    // TODO: send the error to remote logging infrastructure
    console.error(result.message); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${result.message}`);

    // Let the app keep running by returning an empty result.
    return of(result);
  }

  /** Log a JwtDecodeTokenService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`JwtDecodeTokenService: ${message}`);
    console.log(`JwtDecodeTokenService: ${message}`);
  }

}
