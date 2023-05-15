import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntregaDevolucionService } from 'src/app/entregaDevolucion/services/entregaDevolucion.service';
import { EquipoService } from 'src/app/equipo/services/equipo.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import * as moment from 'moment';


@Component({
  selector: 'app-form-entregadevolucion',
  templateUrl: './form-entregadevolucion.component.html',
  // styleUrls: ['./form-entregadevolucion.component.scss'],
})
export class FormEntregaDevolucionComponent implements OnInit {

  listEntregaDevolucions: any[] = [];
  _grupos: any = [];
  _roles: any = [];
  createEntregaDevolucion: FormGroup;
  submitted = false;
  loading = false;
  id: number | null;
  _equipos: any = [];
  _usuarios: any = [];
  tituloEntregaDevolucion = 'Agregar Entrega o Devolucion';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _entregadevolucionService: EntregaDevolucionService,
    private _equipoService: EquipoService,
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
  ) {
    this.createEntregaDevolucion = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      idUsuario: ['', [Validators.required]],
      idEquipos: ['', [Validators.required]],
      fechaIncio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    });
    const idRuta = this.aRoute.snapshot.paramMap.get('id');
    if (idRuta) {
      this.id = parseInt(idRuta);
      _entregadevolucionService.getById(this.id).subscribe(data => {
        if (!data.error) {
          this.editarEntregaDevolucion(data);
        }
      })
    }
  }

  ngOnInit(): void {
    this.createEntregaDevolucion = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      idUsuario: ['', [Validators.required]],
      idEquipos: ['', [Validators.required]],
      fechaIncio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    });
    this._equipoService.getListEquipos().subscribe(data => {
      this._equipos = data;
    });

    this._usuarioService.getListUsuarios().subscribe(data => {
      this._usuarios = data;
    });

  }

  guardarEntregaDevolucion() {
    const entregadevolucion: any = {
      codigo: this.createEntregaDevolucion.get('codigo')?.value,
      idUsuario: this.createEntregaDevolucion.get('idUsuario')?.value,
      idEquipos: this.createEntregaDevolucion.get('idEquipos')?.value,
      fechaIncio: this.createEntregaDevolucion.get('fechaIncio')?.value,
      fechaFin: this.createEntregaDevolucion.get('fechaFin')?.value
    }


    if (!this.id) {
      // Agregamos un nuevo entregadevolucion
      this._entregadevolucionService.saveEntregaDevolucion(entregadevolucion).subscribe(data => {
        this.toastr.success('La entrega o devolucion fue registrado con exito!', 'EntregaDevolucion Registrado');
        this.createEntregaDevolucion.reset();
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })
    } else {

      entregadevolucion.id = this.id;
      // Editamos entregadevolucion
      this._entregadevolucionService.updateEntregaDevolucion(this.id, entregadevolucion).subscribe(data => {
        this.createEntregaDevolucion.reset();
        this.tituloEntregaDevolucion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La entrega o devolucion fue actualizada con exito!', 'EntregaDevolucion Actualizado');
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })

    }


  }

  editarEntregaDevolucion(entregadevolucion: any) {
    this.tituloEntregaDevolucion = 'Editar EntregaDevolucion';
    this.id = entregadevolucion.id;

    this.createEntregaDevolucion.patchValue({
      codigo: entregadevolucion.codigo,
      idEquipos: entregadevolucion.idEquipos,
      idUsuario: entregadevolucion.idUsuario,
      fechaIncio: moment(entregadevolucion.fechaIncio).format('YYYY-MM-DD'),
      fechaFin:  moment(entregadevolucion.fechaFin).format('YYYY-MM-DD')
    })
  }

}
