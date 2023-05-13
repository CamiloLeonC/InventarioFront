import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from '../services/alumno.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  // styleUrls: ['./alumno.component.css'],
})
export class AlumnoComponent implements OnInit {
  alumnos: any[] = [];

  constructor(
    private _alumnoService: AlumnoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.getAlumnos();
    this.obtenerAlumnos();
  }

  obtenerAlumnos() {
    this._alumnoService.getListAlumnos().subscribe(data => {
      console.log(data);
      this.alumnos = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarAlumno(id: number) {
    this._alumnoService.deleteAlumno(id).subscribe(data => {
      if(data){

      }
      this.toastr.error('El alumno fue eliminado con exito!', 'Alumno eliminado');
      this.obtenerAlumnos();
    }, error => {
      console.log(error);
    })
  }

}
