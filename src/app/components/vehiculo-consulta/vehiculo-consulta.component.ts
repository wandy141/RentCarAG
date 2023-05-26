import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-vehiculo-consulta',
  templateUrl: './vehiculo-consulta.component.html',
  styleUrls: ['./vehiculo-consulta.component.css'],
})
export class VehiculoConsultaComponent {
  constructor(public servicio: ApiDBService, private router: Router) {
    this.llenarTabla();
  }
  llenarAll: Array<vehiculo> = [];

  llenarTabla() {
    this.servicio.getTodosVehiculos().subscribe((mostrarAll) => {
      this.llenarAll = mostrarAll;
    });
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

  visualizar(obj: any) {
    this.servicio.setData(obj);
    this.router.navigate(['recepcion']);
  }
}
