import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { SeguimientoService } from '../services/seguimiento.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  // styleUrls: ['./seguimiento.component.css'],
})
export class SeguimientoComponent implements OnInit {
  seguimientos: any[] = [];
  _admin: boolean = false;


  constructor(
    private _seguimientoService: SeguimientoService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) {
    jwtDecodeTokenService.getRole().subscribe(data => {
      this._admin = data === 'Administrador' ? true : false;
    });
  }

  ngOnInit(): void {
    // this.getSeguimientos();
    this.obtenerSeguimientos();
  }

  obtenerSeguimientos() {
    this._seguimientoService.getListSeguimientos().subscribe(data => {
      console.log(data);
      this.seguimientos = data;
      this.seguimientos.forEach(registro => {
        this._seguimientoService.getUserRoles(registro.Id)
          .subscribe(roles => {
            registro.Rol = roles.descripcion;
          });
      })
    }, error => {
      console.log(error)
    })
  }

  eliminarSeguimiento(id: number) {
    this._seguimientoService.deleteSeguimiento(id).subscribe(data => {
      let error = !data?.error;
      if (!error) {
        this.toastr.warning(data.error, 'Error');
        this.obtenerSeguimientos();
      } else {
        this.toastr.error('El seguimiento fue eliminado con exito!', 'Seguimiento eliminado');
        this.obtenerSeguimientos();
      }
    }, error => {
      console.log(error);
    })
  }

}
