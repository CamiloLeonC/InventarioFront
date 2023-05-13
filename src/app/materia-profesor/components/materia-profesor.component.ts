import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { MateriaProfesorService } from '../services/materia-profesor.service';

@Component({
  selector: 'app-materiaprofesor',
  templateUrl: './materia-profesor.component.html',
  // styleUrls: ['./materiaprofesor.component.scss']
})
export class MateriaProfesorComponent implements OnInit {
  materiaprofesores: any[] = [];
  _admin: boolean = false;

  constructor(
    private _materiaprofesorService: MateriaProfesorService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) {
    jwtDecodeTokenService.getRole().subscribe(data => {
      this._admin = data === 'Administrador' ? true : false;
    });
  }

  ngOnInit(): void {
    this.obtenerMateriaProfesors();
  }

  obtenerMateriaProfesors() {
    this._materiaprofesorService.getListMateriaProfesors().subscribe(data => {
      console.log(data);
      this.materiaprofesores = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarMateriaProfesor(id: number) {
    this._materiaprofesorService.deleteMateriaProfesor(id).subscribe(data => {
      let error = !data?.error;
      if (!error) {
        this.toastr.warning(data.error, 'Error');
        this.obtenerMateriaProfesors();
      } else {
        this.toastr.error('La materia asignada a profesor fue eliminada con exito!', 'MateriaProfesor eliminada');
        this.obtenerMateriaProfesors();
      }
    }, error => {
      console.log(error);
    })

  }

}
