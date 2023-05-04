import { Component } from '@angular/core';
import { tipoVehiculo } from 'src/app/clasebd/tipoVehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.css']
})
export class TipoVehiculoComponent {
  tipotxt: string = '';
  mensaje:string = '';
  estadotxt: number = 2;
  msgSuccess: boolean = false;
  msgTipo: boolean = false;
  msgEstado: boolean = false;
  error: boolean = false;
  idtxt: any = undefined;

  
tablaTipo:Array<tipoVehiculo> = [];
  constructor( public servicio: ApiDBService) {
    this.llenarTabla();

  }

  guadarTipo() {
    this.error = false;

    if (this.tipotxt == '') {
      this.mensaje = 'tipo'
      this.error = true;
      this.msgTipo = true;
      setTimeout(() => {
        this.msgTipo = false
      }, 3000);

    } 
    
    if (this.estadotxt == 2) {
      this.mensaje = 'Estado'
      this.error = true;
      this.msgEstado = true;
      setTimeout(() => {
        this.msgEstado = false
      }, 3000);
    }

    let tipoVehiculoTmp: tipoVehiculo = new tipoVehiculo();
    tipoVehiculoTmp.idtipo = this.idtxt;
    tipoVehiculoTmp.tipo = this.tipotxt;
    tipoVehiculoTmp.estado = this.estadotxt;

    if (this.error) {
      return;
    }
    this.servicio.guardarTipos(tipoVehiculoTmp).subscribe(resultado => {
      
      console.log(resultado);
      this.msgSuccess = true;
      setTimeout(() => {
        this.msgSuccess = false;
      }, 3000);
      this.limpiar();
      this.llenarTabla();



    })
  }


  limpiar() {
    this.idtxt = 0;
    this.tipotxt = '';
    this.estadotxt = 2;
  }

  seleccionarTipo(objVehiculo: tipoVehiculo) {
    this.idtxt = objVehiculo.idtipo;
    this.tipotxt = objVehiculo.tipo;
    this.estadotxt = objVehiculo.estado;
  }

  tipoId(idtipo: number) {
   this.servicio.getTipoId(idtipo).subscribe(resultado => {
      console.log(resultado);
      this.seleccionarTipo;

      if (idtipo !== null) {
        this.idtxt = resultado.idtipo;
        this.tipotxt = resultado.tipo;
        this.estadotxt = resultado.estado;
      }

    })
  }

  llenarTabla(){
  this.servicio.getTipoVehiculos().subscribe(lista =>{
      this.tablaTipo = lista;
    });
  }
}






