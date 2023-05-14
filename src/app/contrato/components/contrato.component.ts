import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { ContratoService } from '../services/contrato.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  // styleUrls: ['./contrato.component.css'],
})
export class ContratoComponent implements OnInit {
  contratos: any[] = [];
  _admin: boolean = false;


  constructor(
    private _contratoService: ContratoService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) {
    jwtDecodeTokenService.getRole().subscribe(data => {
      this._admin = data === 'Administrador' ? true : false;
    });
  }

  ngOnInit(): void {
    // this.getContratos();
    this.obtenerContratos();
  }

  obtenerContratos() {
    this._contratoService.getListContratos().subscribe(data => {
      console.log(data);
      this.contratos = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarContrato(id: number) {
    this._contratoService.deleteContrato(id).subscribe(data => {
      this.toastr.error('El contrato fue eliminado con exito!', 'Contrato eliminado');
      this.obtenerContratos();
    }, error => {
      console.log(error);
      this.toastr.error('Este dato está en uso!', 'Error');

    })
  }

}
