import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { VendeHumosService } from 'src/app/services/vende-humos.service';

@Component({
  selector: 'app-crear-vende',
  templateUrl: './crear-vende.component.html',
  styleUrls: ['./crear-vende.component.css']
})
export class CrearVendeComponent implements OnInit {

  vendeHumos: any = {};

  crearVendeForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    imagen: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
      private vendeService: VendeHumosService,
      private loginService: LoginService,
      private router: Router) { }

  ngOnInit(): void {
  }

  crearVende() {
    
    this.vendeService.crearVende(this.convertVendeHumos())
      .subscribe((datos: any) => {
        this.router.navigate(['']);
      });
  }

  convertVendeHumos(): object {

    let fechaCreacion = new Date().toLocaleDateString()
    let creador = this.loginService.decodeToken();
    
    return {...this.crearVendeForm.value, 'fechaCreacion': fechaCreacion, 'usuarioId': creador};
    
  }

}
