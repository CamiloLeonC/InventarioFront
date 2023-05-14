import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  // styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent implements OnInit {
  
  listUsuarios: any[] = [];
  _grupos: any = [];
  _roles: any = [];
  createUsuario: FormGroup;
  submitted = false;
  loading = false;
  nombre: string | null;
  id: string = "";
  tituloUsuario = 'Agregar Usuario';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
  ) {
    this.createUsuario = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      email: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      documento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
      celular: [],
      rol: ['', [Validators.required]],
    });
    this.nombre =this.aRoute.snapshot.paramMap.keys[0];
    if(this.nombre){
      this.id=this.nombre;
      _usuarioService.getById(this.id).subscribe(data => {
        if(!data.error){
          this.editarUsuario(data);
        }
      })
    }
  }

  ngOnInit(): void {
      this._usuarioService.getListRoles().subscribe(data => {
      this._roles = data;
    });    
  }

  guardarUsuario() {

    let idRoles: string[] = [];
    idRoles.push(this.createUsuario.value.rol);
    const usuario: any = {
      NombreCompleto: this.createUsuario.get('nombreCompleto')?.value,
      Email: this.createUsuario.get('email')?.value,
      Documento: this.createUsuario.get('documento')?.value,
      Celular: this.createUsuario.get('celular')?.value,
      Roles: idRoles,
      IdRol: ""
    }

    
    if(this.id == "") {
      // Agregamos un nuevo usuario
        this._usuarioService.saveUsuario(usuario).subscribe(data => {
          this.toastr.success('El usuario fue registrado con exito!', 'Usuario Registrado');
          this.createUsuario.reset();
        }, error => {
          this.toastr.warning(error.error,'Error')
          console.log(error);
        })
    }else {

      usuario.id = this.id;
      // Editamos usuario
      this._usuarioService.updateUsuario(this.id,usuario).subscribe(data => {
        this.createUsuario.reset();
        this.tituloUsuario = 'Agregar';
        this.id = "";
        this.toastr.info('El usuario fue actualizado con exito!', 'Usuario Actualizado');
      }, error => {
        this.toastr.warning(error.error,'Error')
        console.log(error);
      })
    }      
  }

  editarUsuario(usuario: any) {
    this.tituloUsuario = 'Editar Usuario';
    this.id = usuario.id;

    this.createUsuario.patchValue({
      // titular: usuario.titular,
      nombreCompleto: usuario.nombreCompleto,
      rol: usuario.idRol,
      email: usuario.email,
      documento: usuario.documento,
      celular: usuario.celular,
    })
  }

}
