import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    nombre: [''],
    email: [''],
    avatar: ['']
  })

  constructor( private loginService: LoginService,
      private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUserById();
  }
  
  getUserById() {

    let id = this.loginService.decodeToken();

    if (id) {

      this.loginService.getUserById(id)
        .subscribe((datos: any) => {
          this.user = datos[0];
          this.convertDtoToForm(datos[0]);
        })

    }

  }

  submitUser() {

    if (this.user.username !== this.userForm.get('username')?.value) {

      this.loginService.comprobarUserDuplicado(this.userForm.get('username')?.value)
        .then((duplicado: boolean) => {
  
          if (!duplicado) {
            let id = this.user.id;
            this.user = {...this.userForm.value};
            this.loginService.updateUser(this.user, id as number)
              .subscribe((datos: any) => {
                this.user = datos;
              });
  
          } else {
            // mensaje de error por que ya existe el usuario
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `El usuario ${this.userForm.get('username')?.value} ya existe, prueba con otro.`
            })
  
          }
  
        });

    } else {

      let id = this.user.id;
      this.user = {...this.userForm.value};
      this.loginService.updateUser(this.user, id as number)
        .subscribe((datos: any) => {
          this.user = datos;
        });

    }

    

  }

  convertDtoToForm(user: User) {

    this.userForm.patchValue(user);

  }
}
