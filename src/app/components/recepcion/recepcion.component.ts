import { Component } from '@angular/core';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent {
  data: any;
  listaVehiculos:Array<vehiculo> = [];

constructor(private servicio: ApiDBService){
  this.data = this.servicio.getData();
}

}
