import { Component } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { recibir } from 'src/app/clasebd/recibir';

@Component({
  selector: 'app-recibir',
  templateUrl: './recibir.component.html',
  styleUrls: ['./recibir.component.css']
})
export class RecibirComponent {

  arrayAlquilerAc: Array<alquiler> = [];

    nombreCliente:string ='';
    numeroReserva:number = 0;
    fechaDevolucion:string = '';
    kilometrajeActual:number = 0;
    comentarios:string = '';
    nivelCombustible:number = 0;




}
