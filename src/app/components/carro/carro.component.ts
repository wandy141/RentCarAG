import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tipoVehiculo } from 'src/app/clasebd/tipoVehiculo';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

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
  preciotxt: unknown = '';
  tipoVehiculos: Array<tipoVehiculo> = [];
  years: Array<number> = [];
  cambioPrecio: Array<vehiculo> = [];
  mostrarDropdown: boolean = false;
  sele:boolean = false;
  filtroDes:string = '';
  imagen:any = '';
  imagendata: any;

  @ViewChild("file_input") file_input: ElementRef | undefined;

  constructor(public servicio: ApiDBService, private router: Router) {

    let time = new Date();
    for (let index = time.getFullYear(); index > 2000; index--) {
      this.years.push(index);
    }
    this.llenarTipoVehiculos();
    this.llenarTabla();
  }


  despliega() {
    this.sele = !this.sele;
  }


  llenarTabla() {
    this.servicio.getTodosVehiculos().subscribe((mostrarAll) => {
      this.cambioPrecio = mostrarAll;
    });

  }

  bajo() {
    this.servicio.bajoPrecio().subscribe((mostrarAll) => {
      this.cambioPrecio = mostrarAll;
    });
  }

  medio() {
    this.servicio.medioPrecio().subscribe((mostrarAll) => {
      this.cambioPrecio = mostrarAll;
    });
  }

  mayor() {
    this.servicio.mayorPrecio().subscribe((mostrarAll) => {
      this.cambioPrecio = mostrarAll;
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
    vehiculotmp.precio = this.preciotxt;
    vehiculotmp.imagen = this.imagen;
    vehiculotmp.estado = this.estadotxt;

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


    // let files: FileList = this.file_input?.nativeElement.files;
    // console.log(files);
    // const file: any = files[0];
    // const formData = new FormData();
    // formData.append('file', file);

    // this.servicio.subirImagen(formData).subscribe((data) => {
    //   console.log('Imagen Cargada..>');
    //   console.log(data);
    // }, (error) => {
    //   console.log('Error Cargando Imagen..>');
    // });

    this.servicio
      .insertarVehiculos(vehiculotmp )
      .subscribe((resultado: any) => {
        console.log(resultado);
        if (resultado.resultado) {

          this.guardarImagen(resultado.id);

          this.msgExitoGuardar(this.marcatxt, this.modelotxt);
          this.limpiar();
          this.llenarTabla();
        }
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
    this.preciotxt = '';
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
    this.preciotxt = objVehiculo.precio;
    this.imagen = objVehiculo.imagen;
    this.idtipotxt = objVehiculo.tipo;
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
        retorno = 'Deportivo';
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

  capitalize(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }


  visualizar(obj: any) {
    this.servicio.data = obj;
    this.router.navigate(['recepcion']);
  }

  guardarImagen(id: string) {
    let files: FileList = this.file_input?.nativeElement.files;
    console.log(files);

    for (let index: number = 0; index < files.length; index++) {
      const file: any = files[index];
      console.log(file.data);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', id);

      this.servicio.subirImagen(formData).subscribe((data) => {
        console.log('Imagen Cargada..>');
        console.log(data);
      }, (error) => {
        console.log('Error Cargando Imagen..>');
      });
    }
    // console.log(this.file_input?.nativeElement.files);
  }
}
