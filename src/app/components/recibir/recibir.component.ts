import { Component } from '@angular/core';
import { ApiDBService } from 'src/app/services/api-db.service';
import { recibir } from 'src/app/clasebd/recibir';
import { entrega } from 'src/app/clasebd/entrega';
import Swal from 'sweetalert2';

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
      if (this.idrecibir == null) {
        this.msgFail(
        );
        return;
      }
      if (this.Idcliente == undefined) {
        this.msgFail();
        return;
      }
      if (this.idalquiler == undefined || this.idalquiler == null) {
        this.msgFail();
        return;
      }
      if (this.nombreCliente == '') {
        this.msgFail();
        return;
      }
      if (this.fechaDevolucion == null || this.fechaDevolucion == '') {
        this.msgFail();
        return;
      }
      if (this.comentarios == null || this.comentarios == '') {
        this.msgFail();
        return;
      }


      this.error = false;
      const id = 0;
      let recibirtmp: recibir = new recibir();
      recibirtmp.idrecibir = this.idrecibir;
      recibirtmp.id_cliente = this.Idcliente;
      recibirtmp.id_alquiler = this.idalquiler;
      recibirtmp.NombreCli = this.nombreCliente;
      recibirtmp.FechHoraDev = this.fechaDevolucion;
      recibirtmp.Comentarios = this.comentarios;
      recibirtmp.idvehiculo = this.idvehiculo;
      if (this.error) {
        return;
      }
  
      this.servicio
        .insertarRecibir(recibirtmp)
        .subscribe((resultado: boolean) => {
          if (resultado) {
            this.msgExitoGuardar();
            this.limpiar();
            this.llenarAlquilerActivos();
          } else if (resultado == false) {
            this.msgRecibir();
          }
        });
    }


    llenarAlquilerActivos() {
      this.servicio.todoRecibir().subscribe((resultado) => {
        this.arrayEntrega = resultado;
      });
    }

    msgExitoGuardar() {
      Swal.fire(
        'Éxito',
        '¡Se a Registrado el cliente!',
        'success'
      );
    }

    msgFail() {
      Swal.fire(
        'Oops',
        'Campos vacios',
        'error'
      );
    }

    msgRecibir() {
      Swal.fire(
        'Oops...',
        'Vuelva a intentar',
        'error'
      );
    }
idvehiculo: number =0;
    seleccionarEntrega(objEntrega: entrega) {
      this.idalquiler = objEntrega.idalquiler;
      this.nombreCliente = objEntrega.persona_recibe;
      this.Idcliente = objEntrega.identrega;
      this.idvehiculo = objEntrega.idvehiculo;
    }

    limpiar() {
      this.Idcliente = 0;
      this.idalquiler = 0;
      this.idrecibir = 0;
      this.nombreCliente = '';
      this.fechaDevolucion = '';
      this.comentarios = '';
    }

}
