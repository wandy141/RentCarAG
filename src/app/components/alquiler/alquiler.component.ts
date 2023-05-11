import { Component, OnInit } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css'],
})
export class AlquilerComponent implements OnInit {
  nombreUsuario: string = '';
  idtxt: any = undefined;
  error: boolean = false;
  preciotxt: any = undefined;
  fechaActual: string = '';
  fechaini: string = '';
  fechafin: string = '';
  diasTotales: number = 0;
  total: number = 0;
  usuariotxt: string = '';
  pagoTotal: number = 0;
  modelo: string = '';
  marca: string = '';

  descripcion: boolean = false;

  llenarAll: Array<vehiculo> = [];

  handleInputChange() {
    this.descripcion = false;

    if (this.idtxt == null || this.idtxt == '') {
      this.descripcion = false;
      return;
    } else {
      if (this.modelo == null && this.marca == null) {
        this.descripcion = false;
      } else {
        this.descripcion = true;
      }
    }
  }

  ngOnInit(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dia = String(today.getDate() + 3).padStart(2, '0');

    this.fechaActual = `${yyyy}-${mm}-${dd}`;
    this.fechafin = `${yyyy}-${mm}-${dia}`;

    this.servicio.getNombreUser().subscribe((nombre) => {
      this.usuariotxt = nombre;
    });

    this.fechaini = this.fechaActual;
  }

  constructor(public servicio: ApiDBService) {
    this.llenarTabla();
  }

  calcular() {
    if (this.preciotxt && this.diasTotales) {
      this.total = this.preciotxt * this.diasTotales;
    }
  }

  calculateDays() {
    if (this.fechaini && this.fechafin) {
      const start = new Date(this.fechaini);
      const end = new Date(this.fechafin);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      this.diasTotales = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
  }

  llenarTabla() {
    this.servicio.getTodosVehiculos().subscribe((mostrarAll) => {
      this.llenarAll = mostrarAll;
    });
  }

  limpiar() {
    this.idtxt = 0;
  }

  entrarAlquiler() {
    let alquilerTemp: alquiler = new alquiler();
    alquilerTemp.usuario = this.usuariotxt;
    alquilerTemp.fecha = this.fechaActual;
    alquilerTemp.idvehiculo = this.idtxt;
    alquilerTemp.precio = this.preciotxt;
    alquilerTemp.fechaini = this.fechaini;
    alquilerTemp.fechafin = this.fechafin;
    alquilerTemp.dias = this.diasTotales;
    alquilerTemp.total = this.total;

    this.servicio.insertarAlquiler(alquilerTemp).subscribe((resultado) => {
      console.log(resultado);
    });
  }

  seleccionarTxt(objVehiculo: vehiculo) {
    this.idtxt = objVehiculo.idvehiculo;
    this.preciotxt = objVehiculo.precio;
    this.marca = objVehiculo.marca;
    this.modelo = objVehiculo.modelo;

    this.calcular();

    this.handleInputChange();
  }

  //eventos
  //para que la primera letra del input se vuelva Mayuscula
  capitalize(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
