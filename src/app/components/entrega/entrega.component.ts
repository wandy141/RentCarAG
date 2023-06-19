import { Component } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { entrega } from 'src/app/clasebd/entrega';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css'],
})
export class EntregaComponent {
  arrayAlquilerAc: Array<alquiler> = [];

  idVehiculotxt: any = undefined;
  diatxt: any = undefined;
  clientetxt: string = '';
  usuariotxt: string = '';
  fechainitxt: string = '';
  fechafintxt: string = '';

  error: boolean = false;

  fechahoratxt: string = '';
  notatxt: string = '';
  personatxt: string = '';
  cedulaPersonatxt: string = '';
  kilometrajetxt: any = undefined;
  idAlquilertxt: number = 0;

  constructor(private servicio: ApiDBService) {
    this.llenarAlquilerActivos();
  }

  llenarAlquilerActivos() {
    this.servicio.mostrarAlquilerActivos().subscribe((resultado) => {
      this.arrayAlquilerAc = resultado;
    });
  }

  seleccionarRenta(objAlquiler: alquiler) {
    this.idAlquilertxt = objAlquiler.idalquiler;
    this.usuariotxt = objAlquiler.usuario;
    this.clientetxt = objAlquiler.nombrecliente;
    this.idVehiculotxt = objAlquiler.idvehiculo;
    this.fechainitxt = objAlquiler.fechaini;
    this.fechafintxt = objAlquiler.fechafin;
    this.diatxt = objAlquiler.dias;
  }

  guardarEntrega() {
    this.error = false;
    const identrega = 0;
    let entregatmp: entrega = new entrega();

    entregatmp.identrega = identrega;
    entregatmp.idvehiculo = this.idVehiculotxt;
    entregatmp.idalquiler = this.idAlquilertxt;
    entregatmp.fechahora = this.fechahoratxt;
    entregatmp.persona_recibe = this.personatxt;
    entregatmp.cedula_persona = this.cedulaPersonatxt;
    entregatmp.kilometraje = this.kilometrajetxt;
    entregatmp.nota = this.notatxt;

    if (this.error) {
      return;
    }

    this.servicio
      .insertarEntrega(entregatmp)
      .subscribe((resultado: boolean) => {
        if (resultado) {
          this.msgExitoGuardar();
          this.llenarAlquilerActivos();
          this.limpiar();
        } else if (!resultado) {
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

  limpiar() {
    this.idAlquilertxt = 0;
    this.fechahoratxt = '';
    this.personatxt = '';
    this.cedulaPersonatxt = '';
    this.kilometrajetxt = undefined;
    this.notatxt = '';

    this.idVehiculotxt = 0;
    this.diatxt = 0;
    this.clientetxt = '';
    this.usuariotxt = '';
    this.fechainitxt = '';
    this.fechafintxt = '';
  }


}
