import { Component } from '@angular/core';
import { ApiDBService } from 'src/app/services/api-db.service';
import { recibir } from 'src/app/clasebd/recibir';
import { entrega } from 'src/app/clasebd/entrega';

@Component({
  selector: 'app-recibir',
  templateUrl: './recibir.component.html',
  styleUrls: ['./recibir.component.css']
})
export class RecibirComponent {
    idrecibir: number = 0;
    nombreCliente:string ='';
    Idcliente:any = undefined;
    idalquiler:any = undefined;
    fechaDevolucion:string = '';
    comentarios:string = '';
    error: boolean = false;


    arrayEntrega: Array<entrega> = [];
    constructor(private servicio: ApiDBService) {
      this.llenarAlquilerActivos();
    }

    guardarEntrega() {
      this.error = false;
      const id = 0;
      let recibirtmp: recibir = new recibir();
      recibirtmp.idrecibir = this.idrecibir;
      recibirtmp.id_cliente = this.Idcliente;
      recibirtmp.id_alquiler = this.idalquiler;
      recibirtmp.NombreCli = this.nombreCliente;
      recibirtmp.FechHoraDev = this.fechaDevolucion;
      recibirtmp.Comentarios = this.comentarios;
  
      if (this.error) {
        return;
      }
  
      this.servicio
        .insertarRecibir(recibirtmp)
        .subscribe((resultado: boolean) => {
        console.log('se hizo');
        });
    }


    llenarAlquilerActivos() {
      this.servicio.todoRecibir().subscribe((resultado) => {
        this.arrayEntrega = resultado;
      });
    }

    seleccionarEntrega(objEntrega: entrega) {
      this.idalquiler = objEntrega.identrega;
      this.nombreCliente = objEntrega.persona_recibe;
      this.Idcliente = objEntrega.idalquiler;
    }

}
