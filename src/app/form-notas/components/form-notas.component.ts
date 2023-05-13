import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MateriaProfesorService } from 'src/app/materia-profesor/services/materia-profesor.service';
import { NotaService } from 'src/app/nota/services/nota.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-form-nota',
  templateUrl: './form-notas.component.html',
  // styleUrls: ['./form-nota.component.scss'],
})
export class FormNotaComponent implements OnInit {

  listNotas: any[] = [];
  createNota: FormGroup;
  submitted = false;
  loading = false;
  _materiasprofesores: any = [];
  _alumnos: any = [];
  nombre: string | null;
  id: number | undefined;
  // notaModel: NotaModel;
  tituloNota = 'Agregar Nota';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _notaService: NotaService,
    private _materiaPService: MateriaProfesorService,
    private _alumnoService: UsuarioService,
    private aRoute: ActivatedRoute) {
      this.createNota = this.fb.group({

        IdMateriaProfesor: ['', Validators.required],
        IdAlumno: ['', Validators.required],
        Periodo: ['', Validators.required],
        NotaSaber: ['', [Validators.required,Validators.min(0), Validators.max(2)]],
        NotaHacer: ['', [Validators.required, Validators.min(0), Validators.max(2)]],
        NotaSer: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
        DefinitivaTotal: ['', Validators.required],
        Observaciones: ['', Validators.required],
      });

    this.nombre = this.aRoute.snapshot.paramMap.get('id');
    if (this.nombre) {
      this.id = parseInt(this.nombre);
      _notaService.getById(this.id).subscribe(data => {
        if (!data.error) {
          this.editarNota(data);
        }
      })
    }
  }

  ngOnInit(): void {
    

    this._materiaPService.getListMateriaProfesors().subscribe(data => {
      this._materiasprofesores = data;
    });
    this._alumnoService.getListAlumno().subscribe(data => {
      this._alumnos = data;
    });

    this.createNota.controls.NotaSaber.valueChanges.subscribe(data => {
      if (data) {
        if (this.createNota.controls.NotaHacer.value) {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaSer.value + this.createNota.controls.NotaHacer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaHacer.value);
          }
        } else {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaSer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value);
          }
        }
      } else {
        if (this.createNota.controls.NotaHacer.value) {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSer.value + this.createNota.controls.NotaHacer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaHacer.value);
          }
        } else {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(0);
          }
        }
      }
    });

    this.createNota.controls.NotaHacer.valueChanges.subscribe(data => {
      if (data) {
        if (this.createNota.controls.NotaSaber.value) {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaSer.value + this.createNota.controls.NotaHacer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaHacer.value);
          }
        } else {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaHacer.value + this.createNota.controls.NotaSer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaHacer.value);
          }
        }
      } else {
        if (this.createNota.controls.NotaSaber.value) {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaSer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value);
          }
        } else {
          if (this.createNota.controls.NotaSer.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(0);
          }
        }
      }
    });

    this.createNota.controls.NotaSer.valueChanges.subscribe(data => {
      if (data) {
        if (this.createNota.controls.NotaHacer.value) {
          if (this.createNota.controls.NotaSaber.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaSer.value + this.createNota.controls.NotaHacer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaSer.value);
          }
        } else {
          if (this.createNota.controls.NotaSaber.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaSer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSer.value);
          }
        }
      } else {
        if (this.createNota.controls.NotaHacer.value) {
          if (this.createNota.controls.NotaSaber.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value + this.createNota.controls.NotaHacer.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value);
          }
        } else {
          if (this.createNota.controls.NotaSaber.value) {
            this.createNota.controls.DefinitivaTotal.setValue(this.createNota.controls.NotaSaber.value);
          } else {
            this.createNota.controls.DefinitivaTotal.setValue(0);
          }
        }
      }
    });
  }

  guardarNota() {

    const nota: any = {
      IdMateriaProfesor: parseInt(this.createNota.get('IdMateriaProfesor')?.value),
      IdUser: this.createNota.get('IdAlumno')?.value,
      Periodo: this.createNota.get('Periodo')?.value,
      NotaSaber: this.createNota.get('NotaSaber')?.value,
      NotaHacer: this.createNota.get('NotaHacer')?.value,
      NotaSer: this.createNota.get('NotaSer')?.value,
      DefinitivaTotal: this.createNota.get('DefinitivaTotal')?.value,
      Observaciones: this.createNota.get('Observaciones')?.value
    }

    if (this.id == undefined) {
      // Agregamos una nueva nota
      this._notaService.saveNota(nota).subscribe(data => {
        this.toastr.success('La nota fue registrada con exito!', 'Nota Registrada');
        this.createNota.reset();
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })
    } else {

      nota.id = this.id;
      // Editamos nota
      this._notaService.updateNota(this.id, nota).subscribe(data => {
        this.createNota.reset();
        this.tituloNota = 'Agregar';
        this.id = undefined;
        this.toastr.info('La nota fue actualizada con exito!', 'Nota Actualizada');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })

    }


  }

  eliminarNota(id: number) {
    this._notaService.deleteNota(id).subscribe(data => {
      this.toastr.error('La nota fue eliminada con exito!', 'Nota eliminada');
    }, error => {
      console.log(error);
    })

  }

  editarNota(nota: any) {
    this.tituloNota = 'Editar Nota';
    this.id = nota.id;

    this.createNota.patchValue({
      IdMateriaProfesor: nota.idMateriaProfesor,
      IdAlumno: nota.idUser,
      Periodo: nota.periodo,
      NotaSaber: nota.notaSaber,
      NotaHacer: nota.notaHacer,
      NotaSer: nota.notaSer,
      DefinitivaTotal: nota.definitivaTotal,
      Observaciones: nota.observaciones
    })
  }

}
