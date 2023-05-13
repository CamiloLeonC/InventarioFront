import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfesorService } from 'src/app/profesor/services/profesor.service';

@Component({
  selector: 'app-form-profesor',
  templateUrl: './form-profesor.component.html',
  // styleUrls: ['./form-profesor.component.scss'],
})
export class FormProfesorComponent {
  
  listProfesors: any[] = [];
  createProfesor: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: number | undefined;
  // profesorModel: ProfesorModel;
  tituloProfesor = 'Agregar Profesor';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _profesorService: ProfesorService,
    private aRoute: ActivatedRoute) {
      this.createProfesor = this.fb.group({
        
        NombreCompleto: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
        Correo: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
        Documento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
        IdGrupo: [null, [Validators.required]]
      });
    this.nombre =this.aRoute.snapshot.paramMap.get('id');
    if(this.nombre){
      this.id=parseInt(this.nombre);
      _profesorService.getById(this.id).subscribe(data => {
        if(!data.error){
          this.editarProfesor(data);
        }
      })
    }
  }
  
  ngOnInit(): void {
    this.createProfesor = this.fb.group({
        
      NombreCompleto: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      Correo: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      Documento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
      IdGrupo: [null, [Validators.required]]
    });
  }

  guardarProfesor() {

    const profesor: any = {
      NombreCompleto: this.createProfesor.get('NombreCompleto')?.value,
      Correo: this.createProfesor.get('Correo')?.value,
      Documento: this.createProfesor.get('Documento')?.value,
      IdGrupo: this.createProfesor.get('IdGrupo')?.value,
    }

    if(this.id == undefined) {
      // Agregamos una nueva profesor
        this._profesorService.saveProfesor(profesor).subscribe(data => {
          this.toastr.success('El profesor fue registrado con exito!', 'Profesor Registrado');
          this.createProfesor.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      profesor.id = this.id;
      // Editamos profesor
      this._profesorService.updateProfesor(this.id, profesor).subscribe(data => {
        this.createProfesor.reset();
        this.tituloProfesor = 'Agregar';
        this.id = undefined;
        this.toastr.info('El profesor fue actualizado con exito!', 'Profesor Actualizado');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })

    }

   
  }

  eliminarProfesor(id: number) {
    this._profesorService.deleteProfesor(id).subscribe(data => {
      this.toastr.error('La profesor fue eliminada con exito!','Profesor eliminada');
    }, error => {
      console.log(error);
      this.toastr.error('No se a podido eliminar el registro','Error')
    })

  }

  editarProfesor(profesor: any) {
    this.tituloProfesor = 'Editar Profesor';
    this.id = profesor.id;

    this.createProfesor.patchValue({
      NombreCompleto: profesor.nombreCompleto,
      Correo: profesor.correo,
      Documento: profesor.documento,
      IdGrupo: profesor.idGrupo,
    })
  }
  
}
