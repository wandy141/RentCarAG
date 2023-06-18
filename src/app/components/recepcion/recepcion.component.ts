import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
telefono:string = '';

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

constructor(private servicio: ApiDBService, public router: Router){
  this.data = this.servicio.getData();
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
  this.nombre = '';
  this.correo = '';
  this.cedula = '';
  this.direccion = '';
  this.nacionalidad = '';
  this.lugardeentrega = '';
  this.lugardedevolucion = '';

}

alertaVacio:boolean = false;
guardartodo(){
if (this.nombre == '' || this.correo == '' || this.cedula == '' || this.telefono == '' || this.direccion == '' || this.selectedNacionalidad == '') {
  this.alertaVacio = true;

  setTimeout(() => {
    this.alertaVacio = false;
  }, 3000);

  return;
}

if( this.lugardeentrega == '' || this.dias == 0){
  this.router.navigate(['carroC']);
  return;
}
  this.guardarCliente();
  this.entrarAlquiler();
}
guardarCliente() {
  const idcliente = 0;
  let clientetmp: cliente = new cliente();
  clientetmp.idcliente = idcliente;
  clientetmp.nombre = this.nombre;
  clientetmp.correo = this.correo;
  clientetmp.cedula = this.cedula;
  clientetmp.telefono = this.telefono;
  clientetmp.direccion = this.direccion;
  clientetmp.nacionalidad = this.selectedNacionalidad;

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

}








  

