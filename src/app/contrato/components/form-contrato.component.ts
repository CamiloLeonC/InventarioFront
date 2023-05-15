import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from 'src/app/contrato/services/contrato.service';
import { EquipoService } from 'src/app/equipo/services/equipo.service';
import * as moment from 'moment';
@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  // styleUrls: ['./form-contrato.component.scss'],
})
export class FormContratoComponent implements OnInit {

  listContratos: any[] = [];
  createContrato: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: number | null;
  _equipos: any = [];
  tituloContrato = 'Agregar Contrato';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _contratoService: ContratoService,
    private _equipoService: EquipoService,
    private aRoute: ActivatedRoute) {
    this.createContrato = this.fb.group({
      idEquipo: ['', [Validators.required]],
      codigo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      fechaIncio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      terminosContrato: ['', [Validators.required]],
    });
    const idRuta = this.aRoute.snapshot.paramMap.get('id');
    if (idRuta) {
      this.id = parseInt(idRuta);
      _contratoService.getById(this.id).subscribe(data => {
        if (!data.error) {
          this.editarContrato(data);
        }
      })
    }
  }

  ngOnInit(): void {
    this.createContrato = this.fb.group({
      idEquipo: ['', [Validators.required]],
      codigo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      fechaIncio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      terminosContrato: ['', [Validators.required]],
    });
    this._equipoService.getListEquipos().subscribe(data => {
      this._equipos = data;
    });
  }

  guardarContrato() {
    const contrato: any = {
      idEquipo: this.createContrato.get('idEquipo')?.value,
      codigo: this.createContrato.get('codigo')?.value,
      fechaIncio: this.createContrato.get('fechaIncio')?.value,
      fechaFin: this.createContrato.get('fechaFin')?.value,
      terminosContrato: this.createContrato.get('terminosContrato')?.value
    }

    if (!this.id) {
      // Agregamos un nuevo contrato
      this._contratoService.saveContrato(contrato).subscribe(data => {
        this.toastr.success('El contrato fue registrado con exito!', 'Contrato Registrado');
        this.createContrato.reset();
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })
    } else {

      contrato.id = this.id;
      // Editamos contrato
      this._contratoService.updateContrato(this.id, contrato).subscribe(data => {
        this.createContrato.reset();
        this.tituloContrato = 'Agregar';
        this.id = undefined
        this.toastr.info('El contrato fue actualizado con exito!', 'Contrato Actualizado');
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })

    }
  }

  eliminarMateriaProfesor(id: number) {
    this._contratoService.deleteContrato(id).subscribe(data => {
      this.toastr.error('El contrato fue eliminado con exito!', 'Contrato eliminado');
    }, error => {
      console.log(error);
    })
  }

  editarContrato(contrato: any) {
    this.tituloContrato = 'Editar Contrato';
    this.id = contrato.id;

    this.createContrato.patchValue({
      idEquipo: contrato.idEquipo,
      codigo: contrato.codigo,
      fechaIncio: moment(contrato.fechaIncio).format('YYYY-MM-DD'),
      fechaFin:  moment(contrato.fechaFin).format('YYYY-MM-DD'),
      terminosContrato: contrato.terminosContrato
    })
  }

}
