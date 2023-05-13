import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  // styleUrls: ['./profesor.component.css'],
})
export class ProfesorComponent implements OnInit {
  profesores: any[] = [];

  constructor(
    private _profesorService: ProfesorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.getProfesors();
    this.obtenerProfesors();
  }

  obtenerProfesors() {
    this._profesorService.getListProfesors().subscribe(data => {
      console.log(data);
      this.profesores = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarProfesor(id: number) {
    this._profesorService.deleteProfesor(id).subscribe(data => {
      this.toastr.error('El profesor fue eliminado con exito!', 'Profesor eliminado');
      this.obtenerProfesors();
    }, error => {
      console.log(error);
      this.toastr.error('Este dato está en uso!', 'Error');

    })
  }

}