import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendeHumosService } from 'src/app/services/vende-humos.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  listaAllVende: Array<any> = [];
  inputBuscar: string = '';

  constructor(private vendeService: VendeHumosService,
      private router: Router) { }

  ngOnInit(): void {

    this.getAllVende();

  }

  getAllVende(ordenar?:string, orden?: string) {
    this.vendeService.getAllVende(ordenar, orden)
      .subscribe( (datos: any) => {
        this.listaAllVende = datos;
      } );
  }

  getAllVendeText( cadena: string, ordenar?:string, orden?: string) {
    this.vendeService.getAllVendeText(cadena, ordenar, orden)
      .subscribe((datos:any) => {
        this.listaAllVende = datos;
      })
  }

  buscarVende(event: any) {

    let cadena: string = event.target.value;
    cadena = cadena.trim();

    if (cadena !== '') {
      this.getAllVendeText(cadena);
    } else {
      this.getAllVende();
    }
  }

  crearVende() {
    this.router.navigate(['new-vendehumos']);
  }

  buscarOrdenados(ordenar: string) {
    let orden;
    ordenar === 'titulo' ? orden = 'asc' : undefined;
    
    if (this.inputBuscar !== '') {
      this.getAllVendeText(this.inputBuscar, ordenar, orden);
    } else {
      this.getAllVende(ordenar, orden);
    }

  }

}
