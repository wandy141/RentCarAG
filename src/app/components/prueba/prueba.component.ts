import { Component } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

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


devolucion(idalquiler: number) {
  this.servicio.devolucionAlquiler(idalquiler).subscribe((response: any) => {
    this.tablaAlquiler();
    this.mesgDevolucion(idalquiler);
  });
}

mesgDevolucion(idalquiler: number) {
  Swal.fire(
    'Éxito',
    '¡Se a hecho la devolucion de  ! ' + idalquiler,
    'success'
  );
}

}
