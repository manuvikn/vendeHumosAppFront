import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendeHumosService {

  private readonly endpoint = environment.enpoint;
  listaVende: Array<any> = [];

  constructor(private http: HttpClient) { }

  getAllVende( ordenar:string = 'id', orden: string = 'desc' ) {
    return this.http.get(`${this.endpoint}vendehumos?_sort=${ordenar}&_order=${orden}`);
  }

  crearVende(vendeHumos: any) {
    return this.http.post(`${this.endpoint}vendehumos`, vendeHumos);
  }

  getAllVendeText(cadena: string, ordenar: string = 'id', orden: string = 'desc') {
    return this.http.get(`${this.endpoint}vendehumos?titulo_like=${cadena}&_sort=${ordenar}&_order=${orden}`);
  }

}
