import {  Component, OnInit } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
import { cliente } from 'src/app/clasebd/cliente';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css'],
  
})
export class AlquilerComponent implements OnInit {
  nombreUsuario: string = '';
  error: boolean = false;
  idtxt: any = undefined;
  preciotxt: any = undefined;
  fechaActual: string = '';
  fechaini: string = '';
  fechafin: string = '';
  diasTotales: number = 0;
  pagoTotal: number = 0;
  total: any = undefined;
  usuariotxt: string = '';
  modelo:string = '';
  marca:string = '';
  diferenciaDias: number = 0;
  estadotxt:number = 1;
  listaClientes: Array<cliente> = [];
  cambioPrecio: Array<vehiculo> = [];
  descripcion: boolean = false;
  idClientetxt:any = undefined;
  nombreClientetxt:string = '';



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
    this.calculateDays()
  
    
  }

  constructor(public servicio: ApiDBService) {
    this.llenarTabla();
    this.getClientes();
  }




  getClientes() {
    this.servicio.mostrarCliente().subscribe((listado: any) => {
      this.listaClientes = listado;
    });
  }


 
  bajo() {
    this.servicio.bajoPrecioAc().subscribe((mostrarAll) => {
      this.cambioPrecio = mostrarAll;

    });
  }

  medio() {
    this.servicio.medioPrecioAc().subscribe((mostrarAll) => {
      this.cambioPrecio = mostrarAll;

    });
  }

  
  mayor() {
    this.servicio.mayorPrecioAc().subscribe((mostrarAll) => {
      this.cambioPrecio = mostrarAll;

    });
  }

  handleInputChange() {
    this.descripcion = false;
   
    if(this.idtxt == null || this.idtxt == ''){
      this.descripcion = false;
      return;
    }else{

      if (this.modelo == null && this.marca == null) {
        this.descripcion = false;
        
      }else{
      this.descripcion = true;
      }
      
      

    }

  }


  calcular() {
      this.total = this.preciotxt * this.diasTotales;
    
  }

  calculateDays() {
    if (this.fechaini && this.fechafin) {
      const start = new Date(this.fechaini);
      const end = new Date(this.fechafin);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      this.diferenciaDias = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1);
      this.diasTotales = this.diferenciaDias;
    }
  }

  llenarTabla() {
    this.servicio.carrosActivos().subscribe((  mostrarAll) => {
      this.cambioPrecio = mostrarAll;
    });
  }

  limpiar() {
   this.idtxt = undefined;
   this.preciotxt = undefined;
   this.diasTotales = this.diferenciaDias;
   this.total = undefined;
   this.descripcion = false;
   this.idClientetxt = undefined;
  this.nombreClientetxt = '';
  }

  entrarAlquiler(){

    if (this.estadotxt == null || this.estadotxt == 0) {
      this.msgFallo();
      return;
    }

   
    if (this.idtxt == null) {
      this.msgFallo();
      return;
    }

    if (this.preciotxt == null) {
      this.msgFallo();
      return;
    }

    
    if (this.diasTotales == 0) {
      this.msgFallo();
      return;
    }

    if (this.total == null){
      this.msgFallo();
      return;
    }

    if(this.fechaActual > this.fechafin || this.fechaActual > this.fechaini){
      this.msgFecha();
      return;
    }

    if(this.fechaini > this.fechafin){
      this.msgFecha();
      return;
    }

    if (this.idClientetxt == null || this.idClientetxt == undefined){
      this.msgFallo();
      return;
    }
     
    if (this.nombreClientetxt == null || this.nombreClientetxt == ''){
      this.msgFallo();
      return;
    }


    let alquilerTemp: alquiler = new alquiler();
    alquilerTemp.usuario = this.usuariotxt;
    alquilerTemp.fecha = this.fechaActual;
    alquilerTemp.idcliente = this.idClientetxt;
    alquilerTemp.nombrecliente = this.nombreClientetxt;
    alquilerTemp.idvehiculo = this.idtxt;
    alquilerTemp.precio = this.preciotxt;
    alquilerTemp.fechaini = this.fechaini;
    alquilerTemp.fechafin = this.fechafin;
    alquilerTemp.dias = this.diasTotales;
    alquilerTemp.total = this.total;
    alquilerTemp.estado = this.estadotxt;

      

    this.servicio.insertarAlquiler(alquilerTemp).subscribe((resultado) =>{

      if (resultado) {
        
      this.limpiar();
      this.calculateDays();
      this.msgExitoGuardar(this.usuariotxt);  
      this.llenarTabla();
        
      } else if(resultado == false){
       this. msgRentado();
      }
     })

    
  }

  msgExitoGuardar(usuarioid: string) {
    Swal.fire(
      'Éxito',
      '¡Se a Registrado el Alquiler de ' + usuarioid + '!',
      'success'
    );
  }

  msgFallo() {
    Swal.fire(
      'Oops...',
      '¡Verique si los campos no estan vacios!',
      'error'
    );
  }

  msgRentado() {
    Swal.fire(
      'Oops...',
      '¡Este vehiculo esta rentado en este periodo!',
      'error'
    );
  }

  msgCocheUso(){

    Swal.fire(
      'Oops...',
      '¡Este coche no esta disponible en ese momento!',
      'error'
    );
  }

  msgFecha() {
    Swal.fire(
      'Oops...',
      '¡Verifique las fechas!',
      'error'
    );
  }
  seleccionarTxt(objVehiculo: vehiculo, ) {
    this.idtxt = objVehiculo.idvehiculo;
    this.preciotxt = objVehiculo.precio;
    this.marca = objVehiculo.marca;
    this.modelo = objVehiculo.modelo;

    this.handleInputChange(); 
    this.calcular();
    
  }
  seleccionarCliente(objCliente:cliente){
    this.idClientetxt = objCliente.idcliente;
    this.nombreClientetxt = objCliente.nombre;
  }


  
  getDescripcionTipo(tipo: number) {
    let retorno: string = 'tipo';
    switch (tipo) {
      case 1:
        retorno = 'Economico'
        break;

      case 2:
        retorno = 'Compacto'
        break;

      case 3:
        retorno = 'Deportivo'
        break;

      case 4:
        retorno = 'Premium'
        break;

      case 5:
        retorno = 'Lujo'
        break;

      case 6:
        retorno = 'Camion'
        break;

    }
    return retorno;
  }

 
}
