import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SeguridadService {
    private currentHomeSubject: BehaviorSubject<boolean>;
    public currentHome: Observable<boolean>;

    private timeInactive: number = 0;

    constructor(public dialog: MatDialog) {
        this.currentHomeSubject = new BehaviorSubject<boolean>(false);
        this.currentHome = this.currentHomeSubject.asObservable();
    }

    public get currentHomeValue(): boolean {
        return this.currentHomeSubject.value;
    }

    setCurrentHome(estado: boolean) {
        this.currentHomeSubject.next(estado);
    }

    reiniciarTiempoInactivo() {
        this.timeInactive = 0;
    }

    onCerrarSesion() {
        console.log('logged out');
        window.location.href = `${environment.AppUrl}`;
    }
}