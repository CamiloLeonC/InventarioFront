import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeTokenService } from 'src/app/modulos/jwtdecodetoken.service';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  // styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {
  materias: any[] = [];
  _admin: boolean = false;

  constructor(
    private _materiaService: MateriaService,
    private toastr: ToastrService,
    jwtDecodeTokenService: JwtDecodeTokenService) { 
      jwtDecodeTokenService.getRole().subscribe(data => {
        this._admin = data === 'Administrador' ? true : false;
      });}

    ngOnInit(): void {
      this.obtenerMaterias();
    }
  
    obtenerMaterias() {
      this._materiaService.getListMaterias().subscribe(data => {
        console.log(data);
        this.materias = data;
      }, error => {
        console.log(error)
      })
    }
  
    eliminarMateria(id: number) {
      this._materiaService.deleteMateria(id).subscribe(data => {
        let error = !data?.error;
        if(!error) {
          this.toastr.warning(data.error, 'Error');
          this.obtenerMaterias();
        } else {
          this.toastr.error('La materia fue eliminada con exito!', 'Materia eliminada');
          this.obtenerMaterias();
        } 
      
      }, error => {
        console.log(error);
      })
  
    }

    
   
  }
  