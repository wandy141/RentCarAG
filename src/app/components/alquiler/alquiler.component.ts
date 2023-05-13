import { BootstrapOptions, Component, OnInit } from '@angular/core';
import { alquiler } from 'src/app/clasebd/alquiler';
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


  descripcion: boolean = false;

  llenarAll: Array<vehiculo> = [];


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
    this.servicio.getTodosVehiculos().subscribe((mostrarAll) => {
      this.llenarAll = mostrarAll;
    });
  }

  limpiar() {
   this.idtxt = undefined;
   this.preciotxt = undefined;
   this.diasTotales = this.diferenciaDias;
   this.total = undefined;
   this.descripcion = false;
  }

  entrarAlquiler(){

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


    let alquilerTemp: alquiler = new alquiler();
    alquilerTemp.usuario = this.usuariotxt;
    alquilerTemp.fecha = this.fechaActual;
    alquilerTemp.idvehiculo = this.idtxt;
    alquilerTemp.precio = this.preciotxt;
    alquilerTemp.fechaini = this.fechaini;
    alquilerTemp.fechafin = this.fechafin;
    alquilerTemp.dias = this.diasTotales;
    alquilerTemp.total = this.total;
    
  


    this.servicio.insertarAlquiler(alquilerTemp).subscribe((resultado) =>{
      if (resultado) {
      this.limpiar();
      this.calculateDays();
      this.msgExitoGuardar(this.usuariotxt);  
        
      }else{
        this.msgFallo();
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
      '¡Verique los campos  !',
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
  seleccionarTxt(objVehiculo: vehiculo) {
    this.idtxt = objVehiculo.idvehiculo;
    this.preciotxt = objVehiculo.precio;
    this.marca = objVehiculo.marca;
    this.modelo = objVehiculo.modelo;
    this.handleInputChange(); 
    this.calcular();
    
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

  //eventos
  //para que la primera letra del input se vuelva Mayuscula
  capitalize(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
