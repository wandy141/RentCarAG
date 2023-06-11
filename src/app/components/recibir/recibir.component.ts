import { Component } from '@angular/core';

@Component({
  selector: 'app-recibir',
  templateUrl: './recibir.component.html',
  styleUrls: ['./recibir.component.css']
})
export class RecibirComponent {
    nombreCliente:string ='';
    numeroReserva:number = 0;
    fechaDevolucion:string = '';
    kilometrajeActual:number = 0;
    comentarios:string = '';
    nivelCombustible:number = 0;
}
