import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from 'src/app/alumno/services/alumno.service';
import { GrupoService } from 'src/app/curso/services/grupo.service';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  // styleUrls: ['./form-alumno.component.scss'],
})
export class FormAlumnoComponent implements OnInit {
  
  listAlumnos: any[] = [];
  _grupos: any = [];
  createAlumno: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: number | undefined;
  tituloAlumno = 'Agregar Alumno';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _grupoService: GrupoService,
    private _alumnoService: AlumnoService,
    private aRoute: ActivatedRoute,
  ) {
    this.createAlumno = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      idGrupo: [null, Validators.required],
      jornada: ['', Validators.required],
      tipoSangre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      documento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
      nombreAcudiente: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      numeroAcudiente: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    this.nombre =this.aRoute.snapshot.paramMap.get('id');
    if(this.nombre){
      this.id=parseInt(this.nombre);
      _alumnoService.getById(this.id).subscribe(data => {
        if(!data.error){
          this.editarAlumno(data);
        }
      })
    }
  }

  ngOnInit(): void {
    this._grupoService.getListGrupos().subscribe(data => {
      this._grupos = data;
    });
    
    this.createAlumno = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      idGrupo: [null, Validators.required],
      jornada: ['', Validators.required],
      tipoSangre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      documento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
      nombreAcudiente: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      numeroAcudiente: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });

    
  }

  guardarAlumno() {

    const alumno: any = {
      nombreCompleto: this.createAlumno.get('nombreCompleto')?.value,
      idGrupo: this.createAlumno.get('idGrupo')?.value,
      jornada: parseInt(this.createAlumno.get('jornada')?.value),
      tipoSangre: parseInt(this.createAlumno.get('tipoSangre')?.value),
      correo: this.createAlumno.get('correo')?.value,
      documento: this.createAlumno.get('documento')?.value,
      nombreAcudiente: this.createAlumno.get('nombreAcudiente')?.value,
      numeroAcudiente: this.createAlumno.get('numeroAcudiente')?.value,
      roles: {
        
      }
    }

    
    if(this.id == undefined) {
      // Agregamos un nuevo alumno
        this._alumnoService.saveAlumno(alumno).subscribe(data => {
          this.toastr.success('El alumno fue registrado con exito!', 'Alumno Registrado');
          this.createAlumno.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      alumno.id = this.id;
      // Editamos alumno
      this._alumnoService.updateAlumno(this.id,alumno).subscribe(data => {
        this.createAlumno.reset();
        this.tituloAlumno = 'Agregar';
        this.id = undefined;
        this.toastr.info('El alumno fue actualizado con exito!', 'Alumno Actualizado');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })

    }

   
  }

  editarAlumno(alumno: any) {
    this.tituloAlumno = 'Editar Alumno';
    this.id = alumno.id;

    this.createAlumno.patchValue({
      // titular: alumno.titular,
      nombreCompleto: alumno.nombreCompleto,
      idGrupo: alumno.idGrupo,
      jornada: alumno.jornada,
      tipoSangre: alumno.tipoSangre,
      correo: alumno.correo,
      documento: alumno.documento,
      nombreAcudiente: alumno.nombreAcudiente,
      numeroAcudiente: alumno.numeroAcudiente
    })
  }

}
