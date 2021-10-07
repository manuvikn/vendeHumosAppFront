import { Component, Input, OnInit } from '@angular/core';
import { VendeHumosService } from 'src/app/services/vende-humos.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() vendeHumos: any;

  constructor(private vendeService: VendeHumosService) { }

  ngOnInit(): void {
  }

  votarVende( id: number ) {

    this.vendeService.votarVende(id, this.vendeHumos.votos)
      .subscribe((datos:any) => {
        this.vendeHumos.votos = datos.votos;
      });

  }

}
