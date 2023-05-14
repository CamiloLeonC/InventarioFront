import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeguimientoService } from 'src/app/seguimiento/services/seguimiento.service';

@Component({
  selector: 'app-form-seguimiento',
  templateUrl: './form-seguimiento.component.html',
  // styleUrls: ['./form-seguimiento.component.scss'],
})
export class FormSeguimientoComponent implements OnInit {
  
  listSeguimientos: any[] = [];
  _grupos: any = [];
  _roles: any = [];
  createSeguimiento: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: string = "";
  tituloSeguimiento = 'Agregar Seguimiento';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _seguimientoService: SeguimientoService,
    private aRoute: ActivatedRoute,
  ) {
    this.createSeguimiento = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      // idGrupo: [null, Validators.required],
      // jornada: ['', Validators.required],
      // tipoSangre: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      documento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
      // nombreAcudiente: [],
      celular: [],
      rol: ['', [Validators.required]],
    });
    this.nombre =this.aRoute.snapshot.paramMap.get('id');
    if(this.nombre){
      this.id=this.nombre;
      _seguimientoService.getById(this.id).subscribe(data => {
        if(!data.error){
          this.editarSeguimiento(data);
        }
      })
    }
  }

  ngOnInit(): void {   

    this._seguimientoService.getListRoles().subscribe(data => {
      this._roles = data;
    });   
    
  }

  guardarSeguimiento() {

    let idRoles: string[] = [];
    idRoles.push(this.createSeguimiento.value.rol);
    const seguimiento: any = {
      NombreCompleto: this.createSeguimiento.get('nombreCompleto')?.value,
      // IdGrupo: this.createSeguimiento.get('idGrupo')?.value,
      // Jornada: this.createSeguimiento.get('jornada')?.value,
      // TipoSangre: this.createSeguimiento.get('tipoSangre')?.value,
      Email: this.createSeguimiento.get('email')?.value,
      Documento: this.createSeguimiento.get('documento')?.value,
      // NombreAcudiente: this.createSeguimiento.get('nombreAcudiente')?.value,
      Celular: this.createSeguimiento.get('celular')?.value,
      Roles: idRoles,
      IdRol: ""
    }

    
    if(this.id == "") {
      // Agregamos un nuevo seguimiento
        this._seguimientoService.saveSeguimiento(seguimiento).subscribe(data => {
          this.toastr.success('El seguimiento fue registrado con exito!', 'Seguimiento Registrado');
          this.createSeguimiento.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      seguimiento.id = this.id;
      // Editamos seguimiento
      this._seguimientoService.updateSeguimiento(this.id,seguimiento).subscribe(data => {
        this.createSeguimiento.reset();
        this.tituloSeguimiento = 'Agregar';
        this.id = "";
        this.toastr.info('El seguimiento fue actualizado con exito!', 'Seguimiento Actualizado');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })

    }

   
  }

  editarSeguimiento(seguimiento: any) {
    this.tituloSeguimiento = 'Editar Seguimiento';
    this.id = seguimiento.id;

    this.createSeguimiento.patchValue({
      // titular: seguimiento.titular,
      nombreCompleto: seguimiento.nombreCompleto,
      rol: seguimiento.idRol,
      idGrupo: seguimiento.idGrupo,
      jornada: seguimiento.jornada,
      tipoSangre: seguimiento.tipoSangre,
      email: seguimiento.email,
      documento: seguimiento.documento,
      nombreAcudiente: seguimiento.nombreAcudiente,
      numeroAcudiente: seguimiento.numeroAcudiente,
    })
  }

}
