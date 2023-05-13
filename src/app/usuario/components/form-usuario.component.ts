import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { GrupoService } from 'src/app/curso/services/grupo.service';

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
    private _grupoService: GrupoService,
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
  ) {
    this.createUsuario = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]],
      idGrupo: [null, Validators.required],
      jornada: ['', Validators.required],
      tipoSangre: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      documento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$')]],
      nombreAcudiente: [],
      numeroAcudiente: [],
      rol: ['', [Validators.required]],
    });
    this.nombre =this.aRoute.snapshot.paramMap.get('id');
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
    this._grupoService.getListGrupos().subscribe(data => {
      this._grupos = data;
    });

    this._usuarioService.getListRoles().subscribe(data => {
      this._roles = data;
    });

    this.createUsuario.controls.rol.valueChanges.subscribe(data => {
      if(data === '59d28f6f-b4ac-4d7c-a25b-7d7f0c8f9056'){
        this.createUsuario.controls.nombreAcudiente.setValidators([Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z_ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäåèéêëìíîïðñòóôõöùúûüĀāĂăĄąēĔĕĖėĘęĚěĨĩīĪĬĭĮį \\-\\&\\´\\`\\^\\¨\\~\\¸\\˛\\,\\˝\\``\\˘\\•\\˚\'\\.]+)$')]);
        this.createUsuario.controls.numeroAcudiente.setValidators([Validators.required, Validators.maxLength(200), Validators.pattern('^([A-Za-z0-9_]+$)')]);
        this.createUsuario.controls.nombreAcudiente.reset("");
        this.createUsuario.controls.numeroAcudiente.reset("");
        this.createUsuario.controls.nombreAcudiente.enable();
        this.createUsuario.controls.numeroAcudiente.enable();
      } else {
        this.createUsuario.controls.nombreAcudiente.setValidators(Validators.nullValidator);
        this.createUsuario.controls.numeroAcudiente.setValidators(Validators.nullValidator);
        this.createUsuario.controls.nombreAcudiente.reset(null);
        this.createUsuario.controls.numeroAcudiente.reset(null);
        this.createUsuario.controls.nombreAcudiente.disable();
        this.createUsuario.controls.numeroAcudiente.disable();
      }

      if(data !== '5e9c4aeb-2fa0-47a2-aabc-e73dd89aeec7'){
        this.createUsuario.controls.idGrupo.setValidators([Validators.required]);
        this.createUsuario.controls.idGrupo.reset("");
        this.createUsuario.controls.idGrupo.enable();
      } else {
        this.createUsuario.controls.idGrupo.setValidators(Validators.nullValidator);
        this.createUsuario.controls.idGrupo.reset(null);
        this.createUsuario.controls.idGrupo.disable();
      }
    });
    
  }

  guardarUsuario() {

    let idRoles: string[] = [];
    idRoles.push(this.createUsuario.value.rol);
    const usuario: any = {
      NombreCompleto: this.createUsuario.get('nombreCompleto')?.value,
      IdGrupo: this.createUsuario.get('idGrupo')?.value,
      Jornada: this.createUsuario.get('jornada')?.value,
      TipoSangre: this.createUsuario.get('tipoSangre')?.value,
      Email: this.createUsuario.get('email')?.value,
      Documento: this.createUsuario.get('documento')?.value,
      NombreAcudiente: this.createUsuario.get('nombreAcudiente')?.value,
      NumeroAcudiente: this.createUsuario.get('numeroAcudiente')?.value,
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
      idGrupo: usuario.idGrupo,
      jornada: usuario.jornada,
      tipoSangre: usuario.tipoSangre,
      email: usuario.email,
      documento: usuario.documento,
      nombreAcudiente: usuario.nombreAcudiente,
      numeroAcudiente: usuario.numeroAcudiente,
    })
  }

}
