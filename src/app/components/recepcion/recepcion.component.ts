import { Component, OnInit } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { cliente } from 'src/app/clasebd/cliente';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit{
  data: any;
  listaVehiculos:Array<vehiculo> = [];
  idalquiler: number= 0;
  usuario: string='';
  idcliente: number= 0;
  nombrecliente: string='';
  fecha: string='';
  idvehiculo: number= 0;
  seguro: string='';
  precio: number= 0;
  fechaini:string='';
  fechafin:string='';
  dias: number=0 ;
  total: number= 0;
  nombre: string='';
  correo:string='';
  cedula: string='';
  direccion: string='';
  nacionalidad:string='';
  lugardeentrega:string='';
  lugardedevolucion:string='';
  diferenciaDias: number = 0;
  

constructor(private servicio: ApiDBService){
  this.data = this.servicio.getData();
}
ngOnInit(): void {
 const fechas = this.servicio.getInputValue();
 console.log(fechas.fechaIni);
 console.log(fechas.fechaFin);
 
 this.fechaini = fechas.fechaIni;
 this.fechafin = fechas.fechaFin;
    
}

alerta:boolean = false;

entrarAlquiler() {
  let alquilerTemp: alquiler = new alquiler();
  alquilerTemp.usuario = this.usuario;
  alquilerTemp.fecha = this.fecha;
  alquilerTemp.idcliente = this.idcliente;
  alquilerTemp.nombrecliente = this.nombrecliente;
  alquilerTemp.idvehiculo = this.idvehiculo;
  alquilerTemp.seguro = this.seguro;
  alquilerTemp.precio = this.precio;
  alquilerTemp.fechaini = this.fechaini;
  alquilerTemp.fechafin = this.fechafin;
  alquilerTemp.dias = this.dias;
  alquilerTemp.total = this.total;
  alquilerTemp.lugar_entrega = this.lugardeentrega;
  alquilerTemp.lugar_recibir = this.lugardedevolucion;
  



  this.servicio.insertarAlquiler(alquilerTemp).subscribe((resultado) => {
    if (resultado) {
      this.limpiar();

      this.alerta=true;
      setTimeout(() => {
      this.alerta=false;
      }, 3000);
    }
  });
}
limpiar() {
  this.idcliente = 0;
  this.usuario = '';
  this.idalquiler = 0;
  this.nombrecliente = '';
  this.fecha = '';
  this.idvehiculo = 0;
  this.seguro = '';
  this.precio = 0;
  this.fechaini = '';
  this.fechafin = '';
  this.dias = 0;
  this.dias = 0;
  this.nombre = '';
  this.correo = '';
  this.cedula = '';
  this.direccion = '';
  this.nacionalidad = '';
  this.lugardeentrega = '';
  this.lugardedevolucion = '';

}
guardartodo(){
  this.guardarCliente();
  this.entrarAlquiler();

}
guardarCliente() {
  let clientetmp: cliente = new cliente();
  clientetmp.idcliente = this.idcliente;
  clientetmp.nombre = this.nombre;
  clientetmp.correo = this.correo;
  clientetmp.cedula = this.cedula;
  clientetmp.telefono = this.cedula;
  clientetmp.direccion = this.cedula;

  this.servicio.insertarCliente(clientetmp).subscribe((resultado: boolean) => {
    if (resultado) {
      this.limpiar();
    }
  });

  
}
calculateDays() {
  if (this.fechaini && this.fechafin) {
    const start = new Date(this.fechaini);
    const end = new Date(this.fechafin);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    this.diferenciaDias = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.dias = this.diferenciaDias;
  }
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
  
  }
  
