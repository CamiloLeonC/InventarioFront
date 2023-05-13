import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  // styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  _admin: boolean = false;


  constructor(
    private _usuarioService: UsuarioService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) {
    jwtDecodeTokenService.getRole().subscribe(data => {
      this._admin = data === 'Administrador' ? true : false;
    });
  }

  ngOnInit(): void {
    // this.getUsuarios();
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuarioService.getListUsuarios().subscribe(data => {
      console.log(data);
      this.usuarios = data;
      this.usuarios.forEach(registro => {
        this._usuarioService.getUserRoles(registro.Id)
          .subscribe(roles => {
            registro.Rol = roles.descripcion;
          });
      })
    }, error => {
      console.log(error)
    })
  }

  eliminarUsuario(id: number) {
    this._usuarioService.deleteUsuario(id).subscribe(data => {
      let error = !data?.error;
      if (!error) {
        this.toastr.warning(data.error, 'Error');
        this.obtenerUsuarios();
      } else {
        this.toastr.error('El usuario fue eliminado con exito!', 'Usuario eliminado');
        this.obtenerUsuarios();
      }
    }, error => {
      console.log(error);
    })
  }

}
