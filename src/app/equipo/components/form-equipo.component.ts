import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipoService } from 'src/app/equipo/services/equipo.service';

@Component({
  selector: 'app-form-equipo',
  templateUrl: './form-equipo.component.html',
  // styleUrls: ['./form-equipo.component.scss'],
})
export class FormEquipoComponent implements OnInit {

  listEquipos: any[] = [];
  _grupos: any = [];
  _roles: any = [];
  createEquipo: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: number | undefined;
  _equipos: any = [];
  _usuarios: any = [];
  tituloEquipo = 'Agregar Equipo';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _equipoService: EquipoService,
    private aRoute: ActivatedRoute,
  ) {
    this.createEquipo = this.fb.group({
      codigo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      tipoEquipo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      numeroSerie: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      placa: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      marcaEquipo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      modeloEquipo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      ramEquipo: ['', [Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      dDEquipo: ['', [Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      sOEquipo: ['', [Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
    });
    this.nombre = this.aRoute.snapshot.paramMap.get('id');
    if (this.nombre) {
      this.id = parseInt(this.nombre);
      _equipoService.getById(this.id).subscribe(data => {
        if (!data.error) {
          this.editarEquipo(data);
        }
      })
    }
  }

  ngOnInit(): void {
    this.createEquipo = this.fb.group({
      codigo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      tipoEquipo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      numeroSerie: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      placa: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      marcaEquipo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      modeloEquipo: ['', [Validators.maxLength(200), Validators.pattern('^[A-Za-z0-9_]+$')]],
      ramEquipo: ['', [Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      dDEquipo: ['', [Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      sOEquipo: ['', [Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
    });
    
  }

  guardarEquipo() {
    const equipo: any = {
      Codigo: this.createEquipo.get('codigo')?.value,
      TipoEquipo: this.createEquipo.get('tipoEquipo')?.value,
      NumeroSerie: this.createEquipo.get('numeroSerie')?.value,
      Placa: this.createEquipo.get('placa')?.value,
      MarcaEquipo: this.createEquipo.get('marcaEquipo')?.value,
      ModeloEquipo: this.createEquipo.get('modeloEquipo')?.value,
      RamEquipo: this.createEquipo.get('ramEquipo')?.value,
      DDEquipo: this.createEquipo.get('dDEquipo')?.value,
      SOEquipo: this.createEquipo.get('sOEquipo')?.value
    }


    if (this.id == undefined) {
      // Agregamos un nuevo equipo
      this._equipoService.saveEquipo(equipo).subscribe(data => {
        this.toastr.success('El equipo fue registrado con exito!', 'Equipo Registrado');
        this.createEquipo.reset();
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })
    } else {
      equipo.id = this.id;
      // Editamos equipo
      this._equipoService.updateEquipo(this.id, equipo).subscribe(data => {
        this.createEquipo.reset();
        this.tituloEquipo = 'Agregar';
        this.id = undefined;
        this.toastr.info('El equipo fue actualizado con exito!', 'Equipo Actualizado');
      }, error => {
        this.toastr.warning(error.error, 'Error')
        console.log(error);
      })

    }
  }

  eliminarMateria(id: number) {
    this._equipoService.deleteEquipo(id).subscribe(data => {
      this.toastr.error('el equipo fue eliminado con exito!', 'Equipo eliminado');
    }, error => {
      console.log(error);
    })

  }

  editarEquipo(equipo: any) {
    this.tituloEquipo = 'Editar Equipo';
    this.id = equipo.id;

    this.createEquipo.patchValue({
      // titular: equipo.titular,
      codigo: equipo.codigo,
      tipoEquipo: equipo.tipoEquipo,
      numeroSerie: equipo.numeroSerie,
      placa: equipo.placa,
      marcaEquipo: equipo.marcaEquipo,
      modeloEquipo: equipo.modeloEquipo,
      ramEquipo: equipo.ramEquipo,
      dDEquipo: equipo.ddEquipo,
      sOEquipo: equipo.soEquipo,
    })
  }

}
