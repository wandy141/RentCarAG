import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vehiculo } from '../clasebd/vehiculo';
import { Observable, Subject } from 'rxjs';
import { tipoVehiculo } from '../clasebd/tipoVehiculo';
import { usuarios } from '../clasebd/usuarios';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { alquiler } from '../clasebd/alquiler';
import { cliente } from '../clasebd/cliente';
import { entrega } from '../clasebd/entrega';
import { recibir } from '../clasebd/recibir';
import { mantenimiento } from '../clasebd/mantenimiento';
import { pago } from '../clasebd/pago';

@Injectable({
  providedIn: 'root',
})
export class ApiDBService {
  server = 'http://127.0.0.1:8000/api/';
  token = '';
  data: any;

  constructor(public http: HttpClient, private router: Router) {
    let token = localStorage.getItem('token');
    if (token == null) {
      token = '';
    }
    this.token = token;
  }

  validacionADM() {
    return this.http.post<any>(this.server + 'login', {});
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let status = false;

    return this.getValidacion().then((data) => {
      if (data) {
        return true;
      } else {
        return this.router.parseUrl('login');
      }
    });
  }

  async acceso() {
    return this.http.post<boolean>(this.server + 'tokenExpiration', {
      seccion: this.token,
    });
  }

  async getValidacion() {
    let valor: boolean = false;
    let valort = (await this.acceso()).toPromise().then((status) => {
      if (valor == undefined) {
        valor = false;
        return valor;
      } else {
        if (status == true) {
          valor = true;
        } else {
          valor = false;
        }
        return valor;
      }
    });
    return valort;
  }

  //usuario

  mostrarUsuario(): Observable<Array<usuarios>> {
    return this.http.post<Array<usuarios>>(this.server + 'users', {});
  }

  insertarUsuario(usuariotmp: usuarios): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'storeUser', {
      usuario: usuariotmp,
    });
  }

  llenarTablaUser(usuarioid: string): Observable<usuarios> {
    return this.http.post<usuarios>(this.server + 'users/id', {
      usuarioid: usuarioid,
    });
  }

  getNombreUser() {
    return this.http.post<string>(this.server + 'nombreUser', {
      token: this.token,
    });
  }

  borrarUser(usuarioid: string) {
    return this.http.delete(this.server + 'eliminarUser/' + usuarioid, {});
  }

  login(usuarioid: string, contrasena: string) {
    return this.http.post<any>(this.server + 'login', {
      usuarioid: usuarioid,
      contrasena: contrasena,
    });
  }

  //vehiculo

  getTodosVehiculos(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'allVehiculo', {});
  }

  vehiManteniemiento(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(
      this.server + 'vehiculoMantenimiento',
      {}
    );
  }

  vehiInactivo(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'vehiculoInactivo', {});
  }

  insertarVehiculos(vehiculotmp: vehiculo): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'storeVehiculos', {
      vehiculo: vehiculotmp,
    });
  }

  insertarVehiculosImagen(
    vehiculotmp: vehiculo,
    data: FormData
  ): Observable<any> {
    // return this.http.post<boolean>(this.server + 'storeVehiculos', data, {
    //   vehiculo: vehiculotmp,
    // });
    // return this.http.post<any>(this.server + 'Imagen', data, {
    //   vehiculo: vehiculotmp,
    // });
    return this.http.post<any>(this.server + 'storeVehiculos', {
      data,
      vehiculotmp,
    });
  }

  getIdVehiculo(idvehiculo: number): Observable<vehiculo> {
    return this.http.post<vehiculo>(this.server + 'idVehiculo', {
      idvehiculo: idvehiculo,
    });
  }

  economico(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'tipoEconomico', {});
  }

  lujo(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'tipoLujo', {});
  }

  compacto(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'tipoCompacto', {});
  }

  normal(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'tipoNormal', {});
  }

  premium(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'tipoPremium', {});
  }

  camion(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'tipoCamion', {});
  }

  carrosActivos(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'carrosActivos', {});
  }

  bajoPrecio(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'bajoPrecio', {});
  }

  medioPrecio(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'medioPrecio', {});
  }

  mayorPrecio(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'mayorPrecio', {});
  }

  bajoPrecioAc(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'bajoPrecioAc', {});
  }

  medioPrecioAc(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'medioPrecioAc', {});
  }

  mayorPrecioAc(): Observable<Array<vehiculo>> {
    return this.http.get<Array<vehiculo>>(this.server + 'mayorPrecioAc', {});
  }
  //tipos de vehiculo:

  guardarTipos(tipoVehiculoTmp: tipoVehiculo): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'tipoVehiculos', {
      tipovehiculo: tipoVehiculoTmp,
    });
  }

  getTipoId(idtipo: number): Observable<tipoVehiculo> {
    return this.http.post<tipoVehiculo>(this.server + 'tipoId', {
      idtipo: idtipo,
    });
  }

  getTipoVehiculos(): Observable<Array<tipoVehiculo>> {
    return this.http.post<Array<tipoVehiculo>>(this.server + 'tipoAll', {});
  }
  //cliente
  insertarCliente(clientetmp: cliente): Observable<any> {
    return this.http.post<any>(this.server + 'cliente', {
      cliente: clientetmp,
    });
  }

  insertarEntrega(entregatmp: entrega): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'InsertEntrega', {
      entrega: entregatmp,
    });
  }

  insertarRecibir(recibirtmp: recibir): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'InsertRecibir', {
      recibir: recibirtmp,
    });
  }

  mostrarCliente(): Observable<Array<cliente>> {
    return this.http.get<Array<cliente>>(this.server + 'todoCliente', {});
  }

  clientexId(idcliente: number): Observable<cliente> {
    return this.http.post<cliente>(this.server + 'clienteId', {
      idcliente: idcliente,
    });
  }
  //alquiler

  insertarAlquiler(alquilerTemp: alquiler): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'alquiler', {
      alquiler: alquilerTemp,
    });
  }

  mostrarAlquiler(): Observable<Array<alquiler>> {
    return this.http.get<Array<alquiler>>(this.server + 'todoAlquiler', {});
  }

  mostrarAlquilerActivos(): Observable<Array<alquiler>> {
    return this.http.get<Array<alquiler>>(this.server + 'AlquilerActivo', {});
  }

  vencio(): Observable<Array<alquiler>> {
    return this.http.get<Array<alquiler>>(this.server + 'vencieron', {});
  }

  venceUno(): Observable<Array<alquiler>> {
    return this.http.get<Array<alquiler>>(this.server + 'casiUno', {});
  }

  venceDos(): Observable<Array<alquiler>> {
    return this.http.get<Array<alquiler>>(this.server + 'casiDo', {});
  }

  venceTres(): Observable<Array<alquiler>> {
    return this.http.get<Array<alquiler>>(this.server + 'casiTre', {});
  }

  devolucionAlquiler(idalquiler: number) {
    return this.http.delete(this.server + 'eliminarAlquiler/' + idalquiler, {});
  }

  setData(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  getData(): any {
    let valor: any = localStorage.getItem('data');
    let data: any = JSON.parse(valor);
    return data;
  }

  // removeData(key: string) {
  //   localStorage.removeItem(key);
  // }
  public subirImagen(formData: FormData) {
    return this.http.post<any>(this.server + 'Imagen', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  todoRecibir(): Observable<Array<entrega>> {
    return this.http.get<Array<entrega>>(this.server + 'todoRecibir', {});
  }

  todoMantenimiento(): Observable<Array<mantenimiento>> {
    return this.http.get<Array<mantenimiento>>(
      this.server + 'todoMantenimiento',
      {}
    );
  }

  insertarMantenimiento(mantenimientotmp: mantenimiento): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'insertarMantenimiento', {
      mantenimiento: mantenimientotmp,
    });
  }
  nation() {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all');
   }
  private fechas: { fechaIni: string; fechaFin: string, entrega:string, devolucion:string } = {
    fechaIni: '',
    fechaFin: '',
    entrega: '',
    devolucion: '',
  };
  private entreDias: number = 0;

fechafin:string = '';
  setInputValue(value1: string, value2: string,value3:string,value4:string) {
    this.fechas.fechaIni = value1;
    this.fechas.fechaFin = value2;
    this.fechas.entrega = value3;
    this.fechas.devolucion = value4;
  }

  getInputValue() {
    return this.fechas;
  }

  setDias(value1: number) {
    this.entreDias = value1;
  }

  getDias() {
    return this.entreDias;
  }






  private fechasSubject = new Subject<any>();

  fechas$ = this.fechasSubject.asObservable();

  actualizarFechas(fechas: any) {
    this.fechasSubject.next(fechas);
  }



  buscarAutosDisponibles(fechaini: string, fechafin: string): Observable<any> {
    const url = this.server + 'buscarAutosDisponibles'; 
    const body = { fechaini, fechafin };
    
    return this.http.post(url, body);
  }

}

