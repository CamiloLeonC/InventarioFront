import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { GrupoService } from '../services/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  // styleUrls: ['./grupo.component.css'],
})
export class GrupoComponent implements OnInit {
  grupos: any[] = [];
  _admin: boolean = false;

  constructor(
    private _grupoService: GrupoService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) { 
      jwtDecodeTokenService.getRole().subscribe(data => {
        this._admin = data === 'Administrador' ? true : false;
      });
  }

  ngOnInit(): void {
    // this.getGrupos();
    this.obtenerGrupos();
  }

  obtenerGrupos() {
    this._grupoService.getListGrupos().subscribe(data => {
      console.log(data);
      this.grupos = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarGrupo(id: number) {
    this._grupoService.deleteGrupo(id).subscribe(data => {
      let error = !data?.error;
      if(!error) {
        this.toastr.warning(data.error, 'Error');
        this.obtenerGrupos();
      } else {
        this.toastr.error('El grupo fue eliminado con exito!', 'Grupo eliminado');
        this.obtenerGrupos();
      }
      
    }, error => {
      console.log(error);
    })
  }
}