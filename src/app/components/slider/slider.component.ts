import { Component } from '@angular/core';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  nombreUsuario:string = '';


  constructor(private servicio: ApiDBService){

    this.servicio.getNombreUser().subscribe(nombre =>{
      this.nombreUsuario = nombre;
    });
    
  }

  

}
