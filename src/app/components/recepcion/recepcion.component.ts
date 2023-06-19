import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { cliente } from 'src/app/clasebd/cliente';
import { pago } from 'src/app/clasebd/pago';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit{
  data: any;
  listaVehiculos:Array<vehiculo> = [];
  // idalquiler: number= 0;
  usuario: string='';
  // idcliente: number= 0;
  // nombrecliente: string='';
  fecha: string='';
  // idvehiculo: number= 0;
  // precio: number= 0;
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
  nationalities: Array<string> = [];
  selectedNacionalidad: string = '';
  filteredNacionalidades: Array<string> = [];
  seguroValue:number = 20;
  seguroSi: string = 'normal';
  seleccionadoSi: boolean = false;
  seleccionadoNo: boolean = false;
  codigocv: number = 0;
  ano: number = 0;
   mes: string = ''; 
   numerodetarjeta: number = 0;
   nombretj: string = '';
years: number[] = [];


months: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];


  seguro() {
    if (this.seguroSi == 'full') {
      this.seguroValue = 40;
    } else {
      this.seguroValue = 20;
    }
  }


  

  getTotal() {
    return this.total + this.seguroValue;
  }

constructor(private servicio: ApiDBService){
  this.data = this.servicio.getData();


  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10; // Puedes ajustar el rango según tus necesidades

  for (let year = startYear; year <= currentYear; year++) {
    this.years.push(year);
  }
}

ngOnInit(): void {
 const fechas = this.servicio.getInputValue();
 this.fechaini = fechas.fechaIni;
 this.fechafin = fechas.fechaFin;
 this.lugardeentrega = fechas.entrega;
 this.lugardedevolucion = fechas.devolucion;

 this.servicio.getNombreUser().subscribe((nombre) => {
  this.usuario = nombre;
});

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const hora = String(today.getHours()).padStart(2, '0');
const minutos = String(today.getMinutes()).padStart(2, '0');

this.fecha = `${yyyy}-${mm}-${dd} ${hora}:${minutos}`;
this.dias = this.servicio.getDias();

this.nationality();
this.filteredNacionalidades = this.nationalities;
this.calcular();

}

alerta:boolean = false;

entrarAlquiler() {
 setTimeout(() => {
  
  
const idalquiler = 0;
  let alquilerTemp: alquiler = new alquiler();
  alquilerTemp.idalquiler = idalquiler;
  alquilerTemp.usuario = this.usuario;
  alquilerTemp.fecha = this.fecha;
  alquilerTemp.idcliente = this.idcli;
  alquilerTemp.nombrecliente = this.nombre;
  alquilerTemp.idvehiculo = this.data.idvehiculo;
  alquilerTemp.seguro = this.seguroSi;
  alquilerTemp.precio = this.data.precio;
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
 }, 3000);

}

calcular() {
  this.total = this.data.precio * this.dias;
}


limpiar() {
  this.usuario = '';
  this.fecha = '';
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
  this.guardarPago();
}
guardarCliente() {
  const idcliente = 0;
  let clientetmp: cliente = new cliente();
  clientetmp.idcliente = idcliente;
  clientetmp.nombre = this.nombre;
  clientetmp.correo = this.correo;
  clientetmp.cedula = this.cedula;
  clientetmp.telefono = this.cedula;
  clientetmp.direccion = this.cedula;
  clientetmp.nacionalidad = this.cedula;

  this.servicio.insertarCliente(clientetmp).subscribe((resultado: any) => {
    if (resultado.resultado) {
     this.idcli =  resultado.idcliente
     
    }
  });


}
idcli:number = 0;

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


  

 
  nationality(){
    this.servicio.nation().subscribe(response => {
        this.nationalities = response.map(country => country.name.common);
  this.nacionalidad = '0';
      }, error => {
        console.error('Error al obtener las nacionalidades:', error);
      });
  }
  
 

 

  
  filterNacionalidades() {
    this.filteredNacionalidades = this.nationalities.filter(nacionalidad =>
      nacionalidad.toLowerCase().includes(this.selectedNacionalidad.toLowerCase())
    );
  }
  
  selectNacionalidad(nacionalidad: string) {
    this.selectedNacionalidad = nacionalidad;
    this.filteredNacionalidades = [];
  }


  guardarPago() {
    if (this.nombretj == '') {
      this.msgFallo();
      return;
    }

    if (this.numerodetarjeta == undefined) {
      this.msgFallo();
      return;
    }

    if (this.mes ==  '') {
      this.msgFallo();
      return;
    }

    if (this.ano == undefined) {
      this.msgFallo();
      return;
    }
    
    if (this.codigocv == undefined) {
      this.msgFallo();
      return;
    }

    if (this.total == undefined) {
      this.msgFallo();
      return;
    }


    const idpago = 0;
    let pagotmp: pago = new pago();
    pagotmp.idpago = idpago;
    pagotmp.idcliente = this.idcli;
    pagotmp.nombretj = this.nombretj;
    pagotmp.numerodetarjeta = this.numerodetarjeta;
    pagotmp.mes = this.mes;
    pagotmp.ano = this.ano ;
    pagotmp.codigocv = this.codigocv;
    pagotmp.total = this.total;
  

    this.servicio.insertarPago(pagotmp).subscribe((resultado) => {
      if (resultado) {
        this.limpiar();
  
        
      } else if (resultado == false) {
        
      }
    });
  }


  msgFallo() {
    Swal.fire(
      'Oops...',
      '¡El usuario no existe y/o los campos estan vacios!',
      'error'
    );
  }


}








  

