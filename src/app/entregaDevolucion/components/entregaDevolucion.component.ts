import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { EntregaDevolucionService } from '../services/entregaDevolucion.service';

@Component({
  selector: 'app-entregadevolucion',
  templateUrl: './entregadevolucion.component.html',
  // styleUrls: ['./entregadevolucion.component.css'],
})
export class EntregaDevolucionComponent implements OnInit {
  entregadevolucions: any[] = [];
  _admin: boolean = false;


  constructor(
    private _entregadevolucionService: EntregaDevolucionService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) {
    jwtDecodeTokenService.getRole().subscribe(data => {
      this._admin = data === 'Administrador' ? true : false;
    });
  }

  ngOnInit(): void {
    this.obtenerEntregaDevolucions();
  }

  obtenerEntregaDevolucions() {
    this._entregadevolucionService.getListEntregaDevoluciones().subscribe(data => {
      console.log(data);
      this.entregadevolucions = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarEntregaDevolucion(id: number) {
    this._entregadevolucionService.deleteEntregaDevolucion(id).subscribe(data => {
      let error = !data?.error;
      if (!error) {
        this.toastr.warning(data.error, 'Error');
        this.obtenerEntregaDevolucions();
      } else {
        this.toastr.error('El entregadevolucion fue eliminado con exito!', 'EntregaDevolucion eliminado');
        this.obtenerEntregaDevolucions();
      }
    }, error => {
      console.log(error);
    })
  }

}
