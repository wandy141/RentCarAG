import { Component } from '@angular/core';
import { tipoVehiculo } from 'src/app/clasebd/tipoVehiculo';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';


@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
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
  idtxt: any = undefined;
  error: boolean = false;
  preciotxt:any = undefined;

  //mensajes
  msgSucces: boolean = false;
  msgFail: boolean = false;
  msgMarca: boolean = false;
  msgModelo: boolean = false;
  msgColor: boolean = false;
  msgAsientos: boolean = false;
  msgCombustible: boolean = false;
  msgPrecio:boolean = false;

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
    // this.http.post<Array<vehiculo>>('http://127.0.0.1:8000/api/allVehiculo',{}).subscribe(mostrarAll =>{
    //   this.llenarAll = mostrarAll;
    // });
    this.servicio.getTodosVehiculos().subscribe(mostrarAll => {
      this.llenarAll = mostrarAll;
    });
  }


  llenarTipoVehiculos() {
    this.servicio.getTipoVehiculos().subscribe(lista => {
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
    vehiculotmp.precio = this.preciotxt,
    vehiculotmp.estado = this.estadotxt


    if (this.marcatxt == '') {
      this.error = true;
      this.msgMarca = true;
      setTimeout(() => {
        this.msgMarca = false
      }, 3000);
    }

    if (this.modelotxt == '') {
      this.error = true;
      this.msgModelo = true;
      setTimeout(() => {
        this.msgModelo = false
      }, 3000);
    }

    if (this.colortxt == '') {
      this.error = true;
      this.msgColor = true;
      setTimeout(() => {
        this.msgColor = false
      }, 3000);
    }

    if (this.asientostxt == 0) {
      this.error = true;
      this.msgAsientos = true;
      setTimeout(() => {
        this.msgAsientos = false
      }, 3000);
    }

    if (this.preciotxt == 0) {
      this.error = true;
      this.msgPrecio = true;
      setTimeout(() => {
        this.msgPrecio = false
      }, 3000);
    }

    if (this.combustibletxt == '0') {
      this.error = true;
      this.msgCombustible = true;
      setTimeout(() => {
        this.msgCombustible = false
      }, 3000);
    }

    if (this.error) {
      return;
    }

    this.servicio.insertarVehiculos(vehiculotmp).subscribe(resultado => {
      console.log(resultado);

      if (resultado) {
        this.msgSucces = true;
        this.limpiar();
        setTimeout(() => {
          this.msgSucces = false;
        }, 3000);

      } else {
        this.msgFail = true;
        setTimeout(() => {
          this.msgFail = false;
        }, 3000);
      }
      this.llenarTabla();


    })

  }
  idCompletar(idvehiculo: number) {
    this.servicio.getIdVehiculo(idvehiculo).subscribe(lista => {

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
    })
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

//eventos

//para que la primera letra del input se vuelva Mayuscula
  capitalize(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
