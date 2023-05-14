import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntregaDevolucionService } from 'src/app/entregaDevolucion/services/entregaDevolucion.service';
import { GrupoService } from 'src/app/curso/services/grupo.service';

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
  nombre: string | null;
  id: string = "";
  tituloEntregaDevolucion = 'Agregar Entrega o Devolucion';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _grupoService: GrupoService,
    private _entregadevolucionService: EntregaDevolucionService,
    private aRoute: ActivatedRoute,
  ) {
    this.createEntregaDevolucion = this.fb.group({
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
      _entregadevolucionService.getById(this.id).subscribe(data => {
        if(!data.error){
          this.editarEntregaDevolucion(data);
        }
      })
    }
  }

  ngOnInit(): void {   

    this._entregadevolucionService.getListRoles().subscribe(data => {
      this._roles = data;
    });   
    
  }

  guardarEntregaDevolucion() {

    let idRoles: string[] = [];
    idRoles.push(this.createEntregaDevolucion.value.rol);
    const entregadevolucion: any = {
      NombreCompleto: this.createEntregaDevolucion.get('nombreCompleto')?.value,
      // IdGrupo: this.createEntregaDevolucion.get('idGrupo')?.value,
      // Jornada: this.createEntregaDevolucion.get('jornada')?.value,
      // TipoSangre: this.createEntregaDevolucion.get('tipoSangre')?.value,
      Email: this.createEntregaDevolucion.get('email')?.value,
      Documento: this.createEntregaDevolucion.get('documento')?.value,
      // NombreAcudiente: this.createEntregaDevolucion.get('nombreAcudiente')?.value,
      Celular: this.createEntregaDevolucion.get('celular')?.value,
      Roles: idRoles,
      IdRol: ""
    }

    
    if(this.id == "") {
      // Agregamos un nuevo entregadevolucion
        this._entregadevolucionService.saveEntregaDevolucion(entregadevolucion).subscribe(data => {
          this.toastr.success('El entregadevolucion fue registrado con exito!', 'EntregaDevolucion Registrado');
          this.createEntregaDevolucion.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      entregadevolucion.id = this.id;
      // Editamos entregadevolucion
      this._entregadevolucionService.updateEntregaDevolucion(this.id,entregadevolucion).subscribe(data => {
        this.createEntregaDevolucion.reset();
        this.tituloEntregaDevolucion = 'Agregar';
        this.id = "";
        this.toastr.info('El entregadevolucion fue actualizado con exito!', 'EntregaDevolucion Actualizado');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })

    }

   
  }

  editarEntregaDevolucion(entregadevolucion: any) {
    this.tituloEntregaDevolucion = 'Editar EntregaDevolucion';
    this.id = entregadevolucion.id;

    this.createEntregaDevolucion.patchValue({
      // titular: entregadevolucion.titular,
      nombreCompleto: entregadevolucion.nombreCompleto,
      rol: entregadevolucion.idRol,
      idGrupo: entregadevolucion.idGrupo,
      jornada: entregadevolucion.jornada,
      tipoSangre: entregadevolucion.tipoSangre,
      email: entregadevolucion.email,
      documento: entregadevolucion.documento,
      nombreAcudiente: entregadevolucion.nombreAcudiente,
      numeroAcudiente: entregadevolucion.numeroAcudiente,
    })
  }

}
