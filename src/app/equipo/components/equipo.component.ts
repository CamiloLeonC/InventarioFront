import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { EquipoService } from '../services/equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  // styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  equipos: any[] = [];
  _admin: boolean = false;


  constructor(
    private _equipoService: EquipoService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) {
    jwtDecodeTokenService.getRole().subscribe(data => {
      this._admin = data === 'Administrador' ? true : false;
    });
  }

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  obtenerEquipos() {
    this._equipoService.getListEquipos().subscribe(data => {
      console.log(data);
      this.equipos = data;      
    }, error => {
      console.log(error)
    })
  }

  eliminarEquipo(id: number) {
    this._equipoService.deleteEquipo(id).subscribe(data => {
      let error = !data?.error;
      if (!error) {
        this.toastr.warning(data.error, 'Error');
        this.obtenerEquipos();
      } else {
        this.toastr.error('El equipo fue eliminado con exito!', 'Equipo eliminado');
        this.obtenerEquipos();
      }
    }, error => {
      console.log(error);
    })
  }
}
