import { Component } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
alquileres: Array<alquiler> = [];
  constructor(public servicio: ApiDBService){
    this.tablaAlquiler();
  }


  tablaAlquiler(){
  this.servicio.mostrarAlquiler().subscribe(resultado => {
  this.alquileres = resultado;
  });
}





}
