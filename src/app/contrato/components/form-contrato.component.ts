import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from 'src/app/contrato/services/contrato.service';
import { GrupoService } from 'src/app/curso/services/grupo.service';

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
  idContrato: number | undefined;
  _equipos: any = [];
  tituloContrato = 'Agregar Contrato';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _grupoService: GrupoService,
    private _contratoService: ContratoService,
    private aRoute: ActivatedRoute) {
    this.createContrato = this.fb.group({
      idEquipo: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      codigo: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      fechaIncio: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
      fechaFin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
    });
    this.nombre = this.aRoute.snapshot.paramMap.get('IdContrato');
    if (this.nombre) {
      this.idContrato = parseInt(this.nombre);
      _contratoService.getById(this.idContrato).subscribe(data => {
        if (!data.error) {
          this.editarContrato(data);
        }
      })
    }
  }

  ngOnInit(): void {
    this._contratoService.getListEquipo().subscribe(data => {
      this._equipos = data;
    });
  }

  guardarContrato() {
    const contrato: any = {
      idEquipo: this.createContrato.get('idEquipo')?.value,
      codigo: this.createContrato.get('codigo')?.value,
      fechaIncio: this.createContrato.get('fechaIncio')?.value,
      fechaFin: this.createContrato.get('fechaFin')?.value
    }


    if (this.idContrato == undefined) {
      // Agregamos un nuevo contrato
      this._contratoService.saveContrato(contrato).subscribe(data => {
        this.toastr.success('El contrato fue registrado con exito!', 'Contrato Registrado');
        this.createContrato.reset();
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })
    } else {

      contrato.idContrato = this.idContrato;
      // Editamos contrato
      this._contratoService.updateContrato(this.idContrato, contrato).subscribe(data => {
        this.createContrato.reset();
        this.tituloContrato = 'Agregar';
        this.idContrato = undefined
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
    this.idContrato = contrato.idContrato;

    this.createContrato.patchValue({
      idEquipo: contrato.idEquipo,
      codigo: contrato.codigo,
      fechaIncio: contrato.fechaIncio,
      fechaFin: contrato.fechaFin
    })
  }

}
