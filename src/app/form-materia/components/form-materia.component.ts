import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MateriaService } from 'src/app/materia/services/materia.service';

@Component({
  selector: 'app-form-materia',
  templateUrl: './form-materia.component.html',
  // styleUrls: ['./form-materia.component.scss'],
})
export class FormMateriaComponent implements OnInit {
  
  listMaterias: any[] = [];
  createMateria: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: number | undefined;
  // materiaModel: MateriaModel;
  tituloMateria = 'Agregar Materia';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _materiaService: MateriaService,
    private aRoute: ActivatedRoute) {
      this.createMateria = this.fb.group({
        
        cod: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[A-Za-z0-9_]+$')]],
        nombre: ['', [Validators.required, Validators.required, Validators.maxLength(50), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
        descripcion: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      });
      this.nombre =this.aRoute.snapshot.paramMap.get('id');
    if(this.nombre){
      this.id=parseInt(this.nombre);
      _materiaService.getById(this.id).subscribe(data => {
        if(!data.error){
          this.editarMateria(data);
        }
      })
    }
  }
  
  ngOnInit(): void {
    this.createMateria = this.fb.group({
      cod: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[A-Za-z0-9_]+$')]],
      nombre: ['', [Validators.required, Validators.required, Validators.maxLength(50), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      descripcion: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
  });

  }

  guardarMateria() {

    const materia: any = {
      cod: this.createMateria.get('cod')?.value,
      nombre: this.createMateria.get('nombre')?.value,
      descripcion: this.createMateria.get('descripcion')?.value,
    }

    if(this.id == undefined) {
      // Agregamos una nueva materia
        this._materiaService.saveMateria(materia).subscribe(data => {
          this.toastr.success('La materia fue registrada con exito!', 'Materia Registrada');
          this.createMateria.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      materia.id = this.id;
      // Editamos materia
      this._materiaService.updateMateria(this.id, materia).subscribe(data => {
        this.createMateria.reset();
        this.tituloMateria = 'Agregar';
        this.id = undefined;
        this.toastr.info('La materia fue actualizada con exito!', 'Materia Actualizada');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })

    }

   
  }

  eliminarMateria(id: number) {
    this._materiaService.deleteMateria(id).subscribe(data => {
      this.toastr.error('La materia fue eliminada con exito!','Materia eliminada');
    }, error => {
      console.log(error);
    })

  }

  editarMateria(materia: any) {
    this.tituloMateria = 'Editar Materia';
    this.id = materia.id;

    this.createMateria.patchValue({
      cod: materia.cod,
      nombre: materia.nombre,
      descripcion: materia.descripcion,
    })
  }
  
}
