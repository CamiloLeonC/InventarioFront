import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MateriaProfesorService } from 'src/app/materia-profesor/services/materia-profesor.service';
import { MateriaService } from 'src/app/materia/services/materia.service';
import { ProfesorService } from 'src/app/profesor/services/profesor.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-form-materiaprofesor',
  templateUrl: './form-materia-profesor.component.html',
  // styleUrls: ['./form-materia-profesor.component.scss'],
})
export class FormMateriaProfesorComponent implements OnInit {
  
  listMateriaProfesors: any[] = [];
  createMateriaProfesor: FormGroup;
  submitted = false;
  loading = false;
  _profesores: any = [];
  _materias: any = [];
  nombre: string | null;
  id: number | undefined;
  // materiaprofesorModel: MateriaProfesorModel;
  tituloMateriaProfesor = 'Agregar MateriaProfesor';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _materiaprofesorService: MateriaProfesorService,
    private _profesorService: ProfesorService,
    private _materiaService: MateriaService,
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute) {
      this.createMateriaProfesor = this.fb.group({
        
        idProfesor: ['', Validators.required],
        idMateria: ['', Validators.required],
    });
    this.nombre =this.aRoute.snapshot.paramMap.get('id');
    if(this.nombre){
      this.id=parseInt(this.nombre);
      _materiaprofesorService.getById(this.id).subscribe(data => {
        if(!data.error){
          this.editarMateriaProfesor(data);
        }
      })
    }
  }
  
  ngOnInit(): void {
    // this._profesorService.getListProfesors().subscribe(data => {
    //   this._profesores = data;
    // });
    this._usuarioService.getListProfesor().subscribe(data => {
      this._profesores = data;
    });

    this._materiaService.getListMaterias().subscribe(data => {
      this._materias = data;
    });
  }

  guardarMateriaProfesor() {

    const materiaprofesor: any = {
      IdUser: this.createMateriaProfesor.get('idProfesor')?.value,
      IdMateria: parseInt(this.createMateriaProfesor.get('idMateria')?.value)
    }

    if(this.id == undefined) {
      // Agregamos una nueva materiaprofesor
        this._materiaprofesorService.saveMateriaProfesor(materiaprofesor).subscribe(data => {
          this.toastr.success('La materiaprofesor fue registrada con exito!', 'MateriaProfesor Registrada');
          this.createMateriaProfesor.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      materiaprofesor.id = this.id;
      // Editamos materiaprofesor
      this._materiaprofesorService.updateMateriaProfesor(this.id, materiaprofesor).subscribe(data => {
        this.createMateriaProfesor.reset();
        this.tituloMateriaProfesor = 'Agregar';
        this.id = undefined;
        this.toastr.info('La materiaprofesor fue actualizada con exito!', 'MateriaProfesor Actualizada');
      }, error => {
        this.toastr.warning(error.error,'Error')

        console.log(error);
      })

    }

   
  }

  eliminarMateriaProfesor(id: number) {
    this._materiaprofesorService.deleteMateriaProfesor(id).subscribe(data => {
      this.toastr.error('La materiaprofesor fue eliminada con exito!','MateriaProfesor eliminada');
    }, error => {
      console.log(error);
    })

  }

  editarMateriaProfesor(materiaprofesor: any) {
    this.tituloMateriaProfesor = 'Editar MateriaProfesor';
    this.id = materiaprofesor.id;

    this.createMateriaProfesor.patchValue({
      idProfesor: materiaprofesor.idUser,
      idMateria: materiaprofesor.idMateria
    })
  }

}
