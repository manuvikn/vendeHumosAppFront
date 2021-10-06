import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  primaryButton: string = 'Login';
  secondaryButton: string = 'Register';
  user: User = new User();

  displayLogin: boolean = true;
  

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', []],
    pass1: ['', [Validators.required]],
    pass2: ['', []]
  })

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  changeDisplay() {

    this.resetLoginForm();
    
    if (this.displayLogin) {
      this.displayLogin = false;
      this.primaryButton = 'Register';
      this.secondaryButton = 'Login';
      this.changeRequired( this.displayLogin );
    } else {
      this.displayLogin = true;
      this.primaryButton = 'Login';
      this.secondaryButton = 'Register';
      this.changeRequired( this.displayLogin );
    }

  }

  resetLoginForm() {
    this.loginForm.reset({
      username: '',
      email: '',
      pass1: '',
      pass2: ''
    });
  }

  changeRequired(login: boolean) {

    if (login) {

      this.loginForm.get('pass2')?.clearValidators();
      this.loginForm.get('pass2')?.updateValueAndValidity();
      
    } else {

      this.loginForm.get('pass2')?.addValidators(Validators.required);
      
    }

  }

  comprobarContrasenia() {

    if ((this.loginForm.get('pass1')?.value !== '') && 
    (this.loginForm.get('pass2')?.value !== '')) {
      if (this.loginForm.get('pass1')?.value !== this.loginForm.get('pass2')?.value) {
        this.loginForm.get('pass2')?.setErrors({'invalidPass': true});
      } else {
        this.loginForm.get('pass2')?.setErrors({'invalidPass': null});
        this.loginForm.get('pass2')?.updateValueAndValidity();
      }

    }

  }

  async submitLogin() {

    if (this.displayLogin) {
      
      await this.loginService.getUser(this.loginForm.get('username')?.value)
        .toPromise()
        .then( (datos: any) => {

          let userList = [];
          userList = datos as Array<any>;

          if (userList.length === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `El usuario ${this.loginForm.get('username')?.value} no existe.`
            })
          } else {
            
            let login: boolean;
            login = this.loginService.comparePass(this.loginForm.get('pass1')?.value, userList[0].pass1 );
            
            if (login) {
              this.loginService.setUsuarioRegistrado(userList[0]);
              this.loginService.logearUsuario(userList[0]);
              this.router.navigate(['']);
              // añadir el token a localStorage
              // navigate a la aplicación
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Los datos no son correctos, prueba otra vez.`
              })
            }

          }
        } );

    } else {

      await this.loginService.comprobarUserDuplicado(this.loginForm.get('username')?.value)
        .then((duplicado: boolean) => {
          if (duplicado){
            // mensaje de error por que ya existe el usuario
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `El usuario ${this.loginForm.get('username')?.value} ya existe, prueba con otro.`
            })

          } else {

            let contra = this.loginService.createPass( this.loginForm.get('pass1')?.value );
            this.user = this.user.convertToUser({...this.loginForm.value, 'pass1': contra});
            this.loginService.createUser(this.user)
              .subscribe((datos: any) => {
                this.loginService.setUsuarioRegistrado(datos);
                this.loginService.logearUsuario(datos);
                this.router.navigate(['']);
              });

          }
        })

    }

    this.resetLoginForm();

  }



}
