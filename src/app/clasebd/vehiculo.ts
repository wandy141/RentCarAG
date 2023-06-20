import { mantenimiento } from './mantenimiento';
export class vehiculo {

  idvehiculo:any;
  marca: string;
  modelo: string;
  color: string;
  asiento: number;
  combustible: string;
  tipo:number;
  ano:number;
  placa:string;
  precio:any ;
  imagen:any;
  mantenimiento: number;
  estado:number;

  constructor() {
    this.idvehiculo = undefined;
    this.marca = '';
    this.modelo = '';
    this.color = '';
    this.asiento = 0;
    this.combustible = '';
    this.tipo = 0;
    this.ano = 0;
    this.placa = '';
    this.precio = undefined;
    this.imagen = ''
    this.mantenimiento = 0;
    this.estado = 0;
  }
}
