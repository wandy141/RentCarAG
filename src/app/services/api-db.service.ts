import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vehiculo } from '../clasebd/vehiculo';
import { Observable } from 'rxjs';
import { tipoVehiculo } from '../clasebd/tipoVehiculo';
import { usuarios } from '../clasebd/usuarios';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { alquiler } from '../clasebd/alquiler';

@Injectable({
  providedIn: 'root'
})
export class ApiDBService {

  server = 'http://127.0.0.1:8000/api/';
  token = '';


  constructor(public http: HttpClient, private router: Router) {
    let token = localStorage.getItem('token');
    if ( token == null ) {
      token = '';
    }
    this.token = token;
  }


  
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      
    let status = false;    

    return this.getValidacion().then(data => {
      if ( data ) {
        return true;
      } else {
        return this.router.parseUrl('login');
      }
    });
    
  }

  async acceso() {
    return this.http.post<boolean>(this.server + 'tokenExpiration', { seccion : this.token });    
  }

  


  async getValidacion() {
    this.validacionADM().subscribe((retorno:any) => {
      if(retorno.estado != 1){
        valor = false;
        return;
      }
    })
    let valor: boolean = false;
    let valort = (await this.acceso()).toPromise().then(status => {
      if ( valor  == undefined) {
        valor = false;
        return valor;
      } else {
        if ( status == true ) {
          valor = true;
        } else {
          valor = false;
        }
        return valor;
      }      
    });
    return valort;
  }

  getTodosVehiculos(): Observable<Array<vehiculo>> {
    return this.http.post<Array<vehiculo>>(this.server + 'allVehiculo', {});
  }

  getTipoVehiculos(): Observable<Array<tipoVehiculo>> {
    return this.http.post<Array<tipoVehiculo>>(this.server + 'tipoAll', {});
  }


  insertarVehiculos(vehiculotmp: vehiculo): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'storeVehiculos', { 'vehiculo': vehiculotmp });
  }

  getIdVehiculo(idvehiculo: number): Observable<vehiculo> {
    return this.http.post<vehiculo>(this.server + 'idVehiculo', { 'idvehiculo': idvehiculo });

  }

  //tipos de vehiculo:

  guardarTipos(tipoVehiculoTmp: tipoVehiculo): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'tipoVehiculos', { 'tipovehiculo': tipoVehiculoTmp });
  }


  getTipoId(idtipo: number): Observable<tipoVehiculo> {
    return this.http.post<tipoVehiculo>(this.server + 'tipoId', { 'idtipo': idtipo });
  }

  login(usuarioid: string, contrasena: string) {
    return this.http.post<any>(this.server + 'login', {
      usuarioid: usuarioid,
      contrasena: contrasena
    });
  }
 
  validacionADM() {
    return this.http.post<any>(this.server + 'login', {
     
    });
  }


  //usuario
  mostrarUsuario(): Observable<Array<usuarios>> {
    return this.http.post<Array<usuarios>>(this.server + 'users', {});
  }


  insertarUsuario(usuariotmp: usuarios): Observable<boolean> {
    return this.http.post<boolean>(this.server + 'storeUser', { 'usuario': usuariotmp });
  }


llenarTablaUser(usuarioid:string):Observable<usuarios>{
  return this.http.post<usuarios>( this.server + 'users/id',{'usuarioid':usuarioid})
}

getNombreUser(){
  return this.http.post<string>(this.server + 'nombreUser',{'token':this.token});
}

borrarUser(usuarioid:string){
  return this.http.delete(this.server + 'eliminarUser/'+ usuarioid, {})
}




economico(): Observable<Array<vehiculo>> {
  return this.http.get<Array<vehiculo>>(this.server + 'tipoEconomico',{});
}

lujo(): Observable<Array<vehiculo>> {
  return this.http.get<Array<vehiculo>>(this.server + 'tipoLujo',{});
}

compacto(): Observable<Array<vehiculo>> {
  return this.http.get<Array<vehiculo>>(this.server + 'tipoCompacto',{});
}

normal(): Observable<Array<vehiculo>> {
  return this.http.get<Array<vehiculo>>(this.server + 'tipoNormal',{});
}

premium(): Observable<Array<vehiculo>> {
  return this.http.get<Array<vehiculo>>(this.server + 'tipoPremium',{});
}

camion(): Observable<Array<vehiculo>> {
  return this.http.get<Array<vehiculo>>(this.server + 'tipoCamion',{});
}


insertarAlquiler(alquilerTemp:alquiler):Observable<Array<alquiler>>{
return this.http.post<Array<alquiler>>(this.server + 'alquiler',{ 'alquiler':alquilerTemp} );
}







// convertObjetJsonToString(e:any){
//   return JSON.stringify(e)
// }

// saveData(key: string, value: string) {
//   localStorage.setItem(key, value);
// }

// getData(key: string) {
//   return localStorage.getItem(key)
  
// }

// removeData(key: string) {
//   localStorage.removeItem(key);
// }

}