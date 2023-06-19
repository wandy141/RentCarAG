import { Component } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  
idrenta:any = undefined;
usuario:string = '';
fecha:string = '';
idcliente:any = undefined;
nombrecliente:string = '';
idvehiculo:any = undefined;
costodia:any = undefined;
inicia:string = '';
termina:string = '';
totaldia:any = undefined;
total:any = undefined;
alquileres: Array<alquiler> = [];
sele:boolean = false;
filtroDes:string = '';


despliega() {
  this.sele = !this.sele;
}



  constructor(private servicio: ApiDBService){
    this.tablaAlquiler();
  }

  seleccionarRenta(objUsuario: alquiler) {
    this.idrenta = objUsuario.idalquiler;
    this.usuario = objUsuario.usuario;
    this.fecha = objUsuario.fecha;
    this.idcliente = objUsuario.idcliente;
    this.nombrecliente = objUsuario.nombrecliente;
    this.idvehiculo = objUsuario.idvehiculo;
    this.costodia = objUsuario.precio;
    this.inicia = objUsuario.fechaini;
    this.termina = objUsuario.fechafin;
    this.totaldia = objUsuario.dias;
    this.total = objUsuario.total
  
  }

  tablaAlquiler(){
  this.servicio.mostrarAlquiler().subscribe(resultado => {
  this.alquileres = resultado;
  this.filtroDes = 'Todos los Rentados';
  });
}


vencieron(){
  this.servicio.vencio().subscribe(resultado => {
  this.alquileres = resultado;
  this.filtroDes = 'Finalizados';
  });
}


venceManana(){
  this.servicio.venceUno().subscribe(resultado => {
  this.alquileres = resultado;
  this.filtroDes = 'Cumple su plazo 1 dia';
  });
}

vencePasado(){
  this.servicio.venceDos().subscribe(resultado => {
  this.alquileres = resultado;
  this.filtroDes = 'Cumple su plazo 2 dias';
  });
}

venceTrasPasado(){
  this.servicio.venceTres().subscribe(resultado => {
  this.alquileres = resultado;
  this.filtroDes = 'Cumple su plazo 3 dias';
  });
}





devolucion(idalquiler: number) {
  this.servicio.devolucionAlquiler(idalquiler).subscribe((response: any) => {
    this.tablaAlquiler();
    this.mesgDevolucion(idalquiler);
  });
}

mesgDevolucion(idalquiler: number) {
  Swal.fire(
    'Éxito',
    '¡Se a hecho la devolucion de  ! ' + idalquiler,
    'success'
  );
}





}
