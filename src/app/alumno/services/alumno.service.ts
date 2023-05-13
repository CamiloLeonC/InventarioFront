import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private AppUrl = environment.AppUrl;
  private ApiUrl = '/api/Alumno'
  // constructor(private firestore: AngularFirestore) {}
  constructor(private http: HttpClient) { }

  getListAlumnos(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`;
    const params: any={};
    params["expand"]="Grupo";
    return this.http.get<any>(Urls, {params}).pipe(
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

  deleteAlumno(id: number): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;

    return this.http.delete(sUrl).pipe(
      tap(_ => this.log(`filter SimAlumno id=${id}`)),
      catchError((error) => this.handleError("deleteAlumno", error))
    );
  }

  saveAlumno(alumno: any): Observable<any> {
    return this.http.post(this.AppUrl + this.ApiUrl, alumno);
  }

  updateAlumno(id: number, alumno: any): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.put(sUrl, alumno);
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


  // agregarAlumno(alumno: any): Promise<any> {
  //   return this.firestore.collection('alumnos').add(alumno);
  // }

  // getAlumnos(): Observable<any> {
  //   return this.firestore.collection('alumnos',ref=>ref.orderBy('fechaCreacion','desc')).snapshotChanges();
  // }

  // eliminarAlumno(id: string ): Promise <any>{
  //   return this.firestore.collection('alumnos').doc(id).delete()
  // }

  // getAlumno(id:string): Observable <any>{
  //   return this.firestore.collection('alumnos').doc(id).snapshotChanges();
  // }

  // actualizarAlumno(id: string, data:any):Promise <any>{
  //   return this.firestore.collection('alumnos').doc(id).update(data);
  // }

