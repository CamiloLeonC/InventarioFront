import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { loginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
  providers: [loginService]

})
export class LoginComponent {

    
    loginForm: FormGroup;
    loginCostos: boolean = true;
    
    loading: boolean = false;
    submitted: boolean  = false;
    inputType: string = 'password';
    content: string = '';
  
    fondo: string = '';
    logo: string = '';
    altLogo: string = '';
    tipoLogin: string = '';
  
    _login: boolean = true;
  
    @Output() logged: EventEmitter<any> = new EventEmitter();
    @BlockUI()
    blockUI!: NgBlockUI;

  constructor(private builder: FormBuilder,
    private _snackBar: MatSnackBar,
    private loginService: loginService,
    private router: Router) {


        this.loginForm = this.builder.group({
            'username': [ '', Validators.required ],
            'password': [ '', Validators.required ]
          }, {
            validators: (formGroup: FormGroup): ValidationErrors | null => {
              const data = formGroup.getRawValue();
              let validationErrors = { };
              return validationErrors;
            }
          });
          if (this.isLogin) {this.router.navigateByUrl('nota'); };
     }

     navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
          this.blockUI.start();
          if (event.url == '/') { sessionStorage.setItem("isMenu", "true"); };
        };
        if (event instanceof NavigationEnd) { this.blockUI.stop(); };
        if (event instanceof NavigationCancel) { this.blockUI.stop(); };
        if (event instanceof NavigationError) { this.blockUI.stop(); };
      }

  ngOnInit(): void {
    
  }

  onSubmit(formData: any) {
    this.loading = true;
    if (this.loginForm.valid) {
      this.loginService.login(formData).subscribe(resp => {
        this.loading = false;
        if (resp.value) {
          this.blockUI.start();
          let user = { token: resp.value };
          localStorage.setItem('currentUser', JSON.stringify(user));

          sessionStorage.setItem("isLogin", "true");
          sessionStorage.setItem('isMenu', 'true');
          sessionStorage.setItem("token", resp.value);
          let data: any = jwt_decode(resp.value);
          this.logged.emit(null);
          switch (data.rol) {
            case 'Administrador':
              this.router.navigateByUrl('usuario');
              break;
              case 'Docente':
                this.router.navigateByUrl('nota');
                break;
              case 'Alumno':
                this.router.navigateByUrl('nota');
                break;
          }


        }
        else if (resp.status === 400)
          this.openNotificationDanger("Usuario o contraseña incorrecta");
        else
          this.openNotificationDanger("Error en inicio de sesión");
      });
    }
  }

  get isLogin(): boolean {
    return JSON.parse(sessionStorage.getItem("isLogin") || 'false');
  };

  openNotificationDanger(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: 'dangerSnackBar',
    });
  }

}
