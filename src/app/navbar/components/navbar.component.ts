import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import jwt_decode from 'jwt-decode';
import { of } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  // styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currentPermisosSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private currentUserSubject: BehaviorSubject<User | null>;
  _admin: boolean = false;
  _docente: boolean = false;
  _alumno: boolean = false;


  constructor() {
    let user = null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);

  }

  ngOnInit(): void {
    this._admin = this.getAdmin();
    this._docente = this.getDocente();
    this._alumno = this.getAlumnon();

  }

  getAdmin(): boolean {
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser')!);
    let data: any = jwt_decode(currentUser.token);
    if(data.rol === 'Administrador'){
      return true;
    } else {
      return false;
    }
  } 

  getDocente(): boolean {
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser')!);
    let data: any = jwt_decode(currentUser.token);
    if(data.rol === 'Docente'){
      return true;
    } else {
      return false;
    }
  } 

  getAlumnon(): boolean {
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser')!);
    let data: any = jwt_decode(currentUser.token);
    if(data.rol === 'Alumno'){
      return true;
    } else {
      return false;
    }
  } 

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
}
export class User {
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
}