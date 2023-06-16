import { Component, OnInit } from '@angular/core';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit{
  data: any;
  listaVehiculos:Array<vehiculo> = [];
  idalquiler: number= 0;
  usuario: string='';
  idcliente: number= 0;
  nombrecliente: string='';
  fecha: string='';
  idvehiculo: number= 0;
  seguro: string='';
  precio: number= 0;
  fechaini:string='';
  fechafin:string='';
  dias: number=0 ;
  total: number= 0;
constructor(private servicio: ApiDBService){
  this.data = this.servicio.getData();
}
ngOnInit(): void {
 const fechas = this.servicio.getInputValue();
 console.log(fechas.fechaIni);
 console.log(fechas.fechaFin);
 
 this.fechaini = fechas.fechaIni;
 this.fechafin = fechas.fechaFin;
    
}
getDescripcionTipo(tipo: number) {
  let retorno: string = 'tipo';
  switch (tipo) {
    case 1:
      retorno = 'Economico';
      break;

    case 2:
      retorno = 'Compacto';
      break;

    case 3:
      retorno = 'Tamaño Normal';
      break;

    case 4:
      retorno = 'Premium';
      break;

    case 5:
      retorno = 'Lujo';
      break;

    case 6:
      retorno = 'Camion';
      break;
  }
  return retorno;
}

}
