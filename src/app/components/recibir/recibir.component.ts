import { Component } from '@angular/core';

@Component({
  selector: 'app-recibir',
  templateUrl: './recibir.component.html',
  styleUrls: ['./recibir.component.css']
})
export class RecibirComponent {
    nombreCliente:string ='';
    Idcliente:any = undefined;
    idalquiler:any = undefined;
    fechaDevolucion:string = '';
    comentarios:string = '';
    nivelCombustible:number = 0;
}
