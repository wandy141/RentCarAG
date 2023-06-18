import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-vehiculo-consulta',
  templateUrl: './vehiculo-consulta.component.html',
  styleUrls: ['./vehiculo-consulta.component.css'],
})
export class VehiculoConsultaComponent implements OnInit {
  llenarAll: Array<vehiculo> = [];
  acceso: boolean = false;
  fechaInicio: string = '';
  fechaFinal: string = '';
  entrega: string = '';
  devolucion: string = '';
  ngOnInit(): void {
    this.servicio.fechas$.subscribe((fechas) => {
      this.fechaInicio = fechas.fechaIni;
      this.fechaFinal = fechas.fechaFin;
      this.entrega = fechas.entrega;
      this.devolucion = fechas.devolucion;
      this.verificar();
      this.buscarAutos();
    });

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dia = String(today.getDate() + 2).padStart(2, '0');
    const hora = String(today.getHours()).padStart(2, '0');
  
    const minutos = String(today.getMinutes()).padStart(2, '0');
  
    this.fechaInicio = `${yyyy}-${mm}-${dd} ${hora}:${minutos}`;
    this.fechaFinal = `${yyyy}-${mm}-${dia} ${hora}:${minutos}`;
  
    this.buscarAutos();



  }

  verificar() {

    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' &&
      this.entrega.length > 0 &&
      this.entrega !== '' &&
      this.devolucion.length > 0 &&
      this.devolucion !== ''
    ) {
      this.acceso = true;
    } else {
      this.acceso = false;
    }
  }
  constructor(public servicio: ApiDBService, private router: Router) {
    this.buscarAutos();
  }

  // llenarTabla() {
  //   this.servicio.getTodosVehiculos().subscribe((mostrarAll) => {
  //     this.llenarAll = mostrarAll;
  //   });
  // }

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
        retorno = 'Deportivo';
        break;

      case 4:
        retorno = 'Premium';
        break;

      case 5:
        retorno = 'Lujo';
        break;

      case 6:
        retorno = 'SUV';
        break;
    }
    return retorno;
  }

  visualizar(obj: any) {
    this.servicio.setData(obj);
    this.router.navigate(['recepcion']);
  }

  buscarAutos() {
    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' ){
    this.servicio.buscarAutosDisponibles(this.fechaInicio, this.fechaFinal)
      .subscribe((response) => {
        this.llenarAll = response;
      });
    }

}
}