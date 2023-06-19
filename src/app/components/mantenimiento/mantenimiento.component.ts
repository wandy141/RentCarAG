import { Component } from '@angular/core';
import { mantenimiento } from 'src/app/clasebd/mantenimiento';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent {

  idmantenimiento: number = 0;
  costo_extra: any = undefined;
  comentario:string = '';
  id_recibir:any = undefined;
  id_vehiculo:any = undefined;
  error: boolean = false;


mantenimientos: Array<vehiculo> = [];
constructor(private servicio: ApiDBService) {
  this.MostrarMantenimiento();
}


seleccionarMantenimiento(objMantenimiento: vehiculo) {
  this.id_vehiculo = objMantenimiento.idvehiculo;
}


MostrarMantenimiento() {
  this.servicio.vehiManteniemiento().subscribe((resultado) => {
    this.mantenimientos = resultado;
  });
}

guardarMantenimiento() {
  if (this.idmantenimiento == null) {
    this.msgFail(






      
    );
    return;
  }
  if (this.id_vehiculo == undefined || this.id_vehiculo == null) {
    this.msgFail();
    return;
  }
  if (this.costo_extra == null) {
    this.msgFail();
    return;
  }
  if (this.comentario == null || this.comentario == '') {
    this.msgFail();
    return;
  }

  let mantenimientotmp: mantenimiento = new mantenimiento();
  mantenimientotmp.idmantenimiento = this.idmantenimiento;
  mantenimientotmp.id_vehiculo = this.id_vehiculo;
  mantenimientotmp.costo_extra = this.costo_extra;
  mantenimientotmp.comentario = this.comentario;


  this.servicio.insertarMantenimiento(mantenimientotmp)
    .subscribe((resultado: boolean) => {
      if (resultado) {
        this.msgExitoGuardar();
        this.MostrarMantenimiento();
      } else if (resultado == false) {
        this.msgMantenido();
      }

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

msgMantenido() {
  Swal.fire(
    'Oops...',
    '¡Ocurrio un Error!',
    'error'
  );
}
}

