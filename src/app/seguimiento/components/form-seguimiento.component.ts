import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntregaDevolucionService } from 'src/app/entregaDevolucion/services/entregaDevolucion.service';
import { SeguimientoService } from 'src/app/seguimiento/services/seguimiento.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-form-seguimiento',
  templateUrl: './form-seguimiento.component.html',
  // styleUrls: ['./form-seguimiento.component.scss'],
})
export class FormSeguimientoComponent implements OnInit {

  listSeguimientos: any[] = [];
  createSeguimiento: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: number | undefined;
  _entregaDevoluciones: any = [];
  _usuarios: any = [];
  tituloSeguimiento = 'Agregar Entrega o Devolucion';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _seguimientoService: SeguimientoService,
    private _entregaDevolucioneservice: EntregaDevolucionService,
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
  ) {
    this.createSeguimiento = this.fb.group({
      idEntregaDevolucion: ['', [Validators.required]],
      codigo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      estado: ['', [Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåè éêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      fechaEstado: ['', [Validators.required]],
    });
    this.nombre = this.aRoute.snapshot.paramMap.get('id');
    if (this.nombre) {
      this.id = parseInt(this.nombre);
      _seguimientoService.getById(this.id).subscribe(data => {
        if (!data.error) {
          this.editarSeguimiento(data);
        }
      })
    }
  }

  ngOnInit(): void {

    this._entregaDevolucioneservice.getListEntregaDevoluciones().subscribe(data => {
      this._entregaDevoluciones = data;
    });

    this._usuarioService.getListUsuarios().subscribe(data => {
      this._usuarios = data;
    });

  }

  guardarSeguimiento() {
    const seguimiento: any = {
      idEntregaDevolucion: this.createSeguimiento.get('idEntregaDevolucion')?.value,
      codigo: this.createSeguimiento.get('codigo')?.value,
      estado: this.createSeguimiento.get('estado')?.value,
      fechaEstado: this.createSeguimiento.get('fechaEstado')?.value,
    }

    if (this.id == undefined) {
      // Agregamos un nuevo seguimiento
      this._seguimientoService.saveSeguimiento(seguimiento).subscribe(data => {
        this.toastr.success('El seguimiento fue registrado con exito!', 'Seguimiento Registrado');
        this.createSeguimiento.reset();
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })
    } else {

      seguimiento.id = this.id;
      // Editamos seguimiento
      this._seguimientoService.updateSeguimiento(this.id, seguimiento).subscribe(data => {
        this.createSeguimiento.reset();
        this.tituloSeguimiento = 'Agregar';
        this.id = undefined;
        this.toastr.info('El seguimiento fue actualizado con exito!', 'Seguimiento Actualizado');
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })

    }


  }

  editarSeguimiento(seguimiento: any) {
    this.tituloSeguimiento = 'Editar Seguimiento';
    this.id = seguimiento.id;

    this.createSeguimiento.patchValue({
      idEntregaDevolucion: seguimiento.idEntregaDevolucion,
      codigo: seguimiento.codigo,
      estado: seguimiento.estado,
      fechaEstado: seguimiento.fechaEstado
    })
  }

}
