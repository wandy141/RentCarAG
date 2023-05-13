import { Component } from '@angular/core';
import { tipoVehiculo } from 'src/app/clasebd/tipoVehiculo';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css'],
})
export class CarroComponent {
  marcatxt: string = '';
  modelotxt: string = '';
  colortxt: string = '';
  asientostxt: number = 0;
  combustibletxt: string = '0';
  numbertxt: number = 0;
  placatxt: string = '';
  estadotxt: number = 0;
  idtipotxt: number = 0;
  idtxt: number = 0;
  error: boolean = false;
  preciotxt: number = 0.0;

  tipoVehiculos: Array<tipoVehiculo> = [];

  years: Array<number> = [];

  llenarAll: Array<vehiculo> = [];

  constructor(public servicio: ApiDBService) {
    let time = new Date();
    for (let index = time.getFullYear(); index > 2000; index--) {
      this.years.push(index);
    }
    this.llenarTipoVehiculos();
    this.llenarTabla();
  }

  llenarTabla() {
    this.servicio.getTodosVehiculos().subscribe((mostrarAll) => {
      this.llenarAll = mostrarAll;
    });
  }

  llenarTipoVehiculos() {
    this.servicio.getTipoVehiculos().subscribe((lista) => {
      this.tipoVehiculos = lista;
    });
  }

  guardarVehiculos() {
    this.error = false;

    let vehiculotmp: vehiculo = new vehiculo();
    vehiculotmp.idvehiculo = this.idtxt;
    vehiculotmp.marca = this.marcatxt;
    vehiculotmp.modelo = this.modelotxt;
    vehiculotmp.color = this.colortxt;
    vehiculotmp.asiento = this.asientostxt;
    vehiculotmp.combustible = this.combustibletxt;
    vehiculotmp.tipo = this.idtipotxt;
    vehiculotmp.ano = this.numbertxt;
    vehiculotmp.placa = this.placatxt;
    vehiculotmp.precio = this.preciotxt
    vehiculotmp.estado = this.estadotxt

    if (this.marcatxt == '') {
      this.error = true;
      this.msgFallo();
    }

    if (this.modelotxt == '') {
      this.error = true;
      this.msgFallo();
    }

    if (this.colortxt == '') {
      this.error = true;
      this.msgFallo();
    }

    if (this.asientostxt == 0) {
      this.error = true;
      this.msgFallo();
    }

    if (this.preciotxt == 0) {
      this.error = true;
      this.msgFallo();
    }

    if (this.combustibletxt == '0') {
      this.error = true;
      this.msgFallo();
    }

    if (this.error) {
      return;
    }

    this.servicio.insertarVehiculos(vehiculotmp).subscribe((resultado:boolean) => {
      console.log(resultado);

      if (resultado) {
        this.msgExitoGuardar(this.marcatxt, this.modelotxt);
        this.limpiar();
      } 

      if(resultado == false){
        this.msgFallo();
      }
      
      this.llenarTabla();
    });
  }
  idCompletar(idvehiculo: number) {
    this.servicio.getIdVehiculo(idvehiculo).subscribe((lista) => {
      if (idvehiculo !== null) {
        this.marcatxt = lista.marca;
        this.modelotxt = lista.modelo;
        this.colortxt = lista.modelo;
        this.asientostxt = lista.asiento;
        this.numbertxt = lista.ano;
        this.placatxt = lista.placa;
        this.idtipotxt = lista.tipo;
        this.combustibletxt = lista.combustible;
        this.estadotxt = lista.estado;
      }
    });
  }
  limpiar() {
    this.marcatxt = '';
    this.modelotxt = '';
    this.colortxt = '';
    this.asientostxt = 0;
    this.combustibletxt = '0';
    this.numbertxt = 0;
    this.placatxt = '';
    this.estadotxt = 0;
    this.idtipotxt = 0;
    this.idtxt = 0;
  }

  seleccionarTxt(objVehiculo: vehiculo) {
    this.idtxt = objVehiculo.idvehiculo;
    this.marcatxt = objVehiculo.marca;
    this.modelotxt = objVehiculo.modelo;
    this.colortxt = objVehiculo.color;
    this.asientostxt = objVehiculo.asiento;
    this.combustibletxt = objVehiculo.combustible;
    this.numbertxt = objVehiculo.ano;
    this.placatxt = objVehiculo.placa;
    this.estadotxt = objVehiculo.estado;
    this.idtipotxt = objVehiculo.tipo;
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



  msgExitoGuardar(marca: string, modelo: string) {
    Swal.fire(
      'Éxito',
      '¡Se a Registrado el Vehiculo ' + marca + modelo + '!',
      'success'
    );
  }

  msgFallo() {
    Swal.fire('Oops...', '¡Ocurrio algo verfica los campos!', 'error');
  }

  //eventos

  //para que la primera letra del input se vuelva Mayuscula
  capitalize(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
