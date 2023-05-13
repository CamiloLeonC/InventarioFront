import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GrupoService } from 'src/app/curso/services/grupo.service';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html',
  // styleUrls: ['./form-grupo.component.scss'],
})
export class FormGrupoComponent implements OnInit {
  
  listGrupos: any[] = [];
  createGrupo: FormGroup;
  submitted = false;
  loading = false;
  // nombre: string | null;
  id: number | undefined;
  // grupoModel: GrupoModel;
  tituloGrupo = 'Agregar Grupo';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _grupoService: GrupoService,
    // private aRoute: ActivatedRoute
    ) {
      this.createGrupo = this.fb.group({        
        curso: ['', Validators.required],
        grado: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.createGrupo = this.fb.group({        
      curso: ['', Validators.required],
      grado: ['', Validators.required],
  });
  }

  guardarGrupo() {

    const grupo: any = {
      curso: this.createGrupo.get('curso')?.value,
      grado: parseInt(this.createGrupo.get('grado')?.value)
    }

    if(this.id == undefined) {
      // Agregamos una nueva grupo
        this._grupoService.saveGrupo(grupo).subscribe(data => {
          this.toastr.success('El grupo fue registrado con exito!', 'Grupo Registrado');
          this.createGrupo.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      grupo.id = this.id;
      // Editamos grupo
      this._grupoService.updateGrupo(this.id, grupo).subscribe(data => {
        this.createGrupo.reset();
        this.tituloGrupo = 'Agregar';
        this.id = undefined;
        this.toastr.info('El grupo fue actualizado con exito!', 'Grupo Actualizada');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })
          
    }

   
  }

  eliminarGrupo(id: number) {
    this._grupoService.deleteGrupo(id).subscribe(data => {
      this.toastr.error('El grupo fue eliminado con exito!','Grupo eliminado');
    }, error => {
      console.log(error);
    })
  }

  editarGrupo(grupo: any) {
    this.tituloGrupo = 'Editar Grupo';
    this.id = grupo.id;

    this.createGrupo.patchValue({
      curso: grupo.curso,
      grado: grupo.grado
    })
  }
}