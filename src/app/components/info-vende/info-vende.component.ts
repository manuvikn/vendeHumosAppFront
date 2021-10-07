import { Component, OnInit } from '@angular/core';
import { VendeHumosService } from 'src/app/services/vende-humos.service';
import { ActivatedRoute } from "@angular/router";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-info-vende',
  templateUrl: './info-vende.component.html',
  styleUrls: ['./info-vende.component.css']
})
export class InfoVendeComponent implements OnInit {

  vendeHumos: any = {};
  comentarios: Array<null> | null = null;

  constructor(private vendeService: VendeHumosService,
    private routes: ActivatedRoute,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.getVendeById(this.routes.snapshot.params['id']);
  }

  getVendeById(id: number) {

    this.vendeService.getVendeById(id)
      .subscribe((datos: any) => {
        this.vendeHumos = datos[0];
        if ((datos[0].comentarios as Array<any>).length !== 0) {
          this.comentarios = this.ordenarComentarios(datos[0].comentarios);
          

        } else {
          this.comentarios = null;
        }
      })

  }

  ordenarComentarios( lista:Array<any> ) {
    return lista?.sort((a: any,b: any) => {
      return (b.id-a.id);
    });
  }

  enviarComentario(inputComentario: any) {
    
    let comentario = (inputComentario.value as string).trim();
    let usuarioId = this.loginService.decodeToken();
    let vendehumoId = this.vendeHumos['id'];
    
    this.vendeService.addComentario({
      comentario: comentario,
      usuarioId: usuarioId,
      vendehumoId: vendehumoId
    }).toPromise()
      .then((datos: any) => {
        this.vendeService.getAllComentariosByVende(datos['vendehumoId'])
        .subscribe((comentarios: any) =>{
          this.comentarios = comentarios;
        })
      })
      inputComentario.value = '';
  }

}
