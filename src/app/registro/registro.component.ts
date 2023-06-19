import { Component } from '@angular/core';
import { registro } from '../clasebd/registro';
import { ApiDBService } from '../services/api-db.service';
import { Router } from '@angular/router';
import { usuarios } from '../clasebd/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  idcliente: string = '';
  msgPassword: boolean = false;
  accediendo: boolean = false;
  hayerrores: boolean = false;
  nombreCom:string = '';
  correo: string = '';
  contrasena: string = '';
  confirmacionContra: string = '';
  error: boolean = false;
  msgError: boolean = false;
  acceder: boolean = true;
  carga: boolean = false;
  msgVacio: boolean = false;

  constructor(public router: Router, public servicio: ApiDBService) {}

guardarRegistro(){
  if (this.idcliente == '') {
    this.msgVacio = true;
    setTimeout(() => {
      this.msgVacio= false;
    }, 3000);
    return;
  }

  if (this.nombreCom == '') {
    this.msgVacio = true;
    setTimeout(() => {
      this.msgVacio= false;
    }, 3000);
    return;
  }

  if (this.correo == '') {
    this.msgVacio = true;
    setTimeout(() => {
      this.msgVacio= false;
    }, 3000);
    return;
  }

  if (this.contrasena == '') {
    this.msgVacio = true;
    setTimeout(() => {
      this.msgVacio= false;
    }, 3000);
    return;
  }

  this.error = false;
  let usuariostmp: usuarios = new usuarios();
  let registrotmp: registro = new registro();
  registrotmp.idcliente = this.idcliente;
  registrotmp.nombreCom = this.nombreCom;
  registrotmp.correo = this.correo;
  registrotmp.contrasena = this.contrasena;
  
  usuariostmp.usuarioid = this.idcliente;
  usuariostmp.nombre = this.nombreCom;
  usuariostmp.contrasena = this.contrasena;
  usuariostmp.estado = 2;


  this.servicio.verificarUsuarioExistente(this.idcliente).subscribe((existe) =>{
    console.log(existe);
    
if(existe == true ){
  this.msgError = true;
  setTimeout(() => {
  this.msgError = false;
    
  }, 3000);
  return;
}else{
  console.log(usuariostmp, registrotmp);
  this.servicio.insertarRegistro(registrotmp, usuariostmp).subscribe((resultado) => {
    console.log(resultado);
    this.router.navigate(['login']);
  });
}
  });
  if (this.error) {
    return;
  }

  
}



mesajeError() {
  if (this.accediendo) {
    return;
  }

  this.msgPassword = false;
  this.accediendo = false;
  this.hayerrores = false;
  this.acceder = true;
  this.carga = false;

  if (this.nombreCom == '') {
    this.msgPassword = true;
    setTimeout(() => {
      this.msgPassword = false;
    }, 3000);
    this.hayerrores = true;
  }

  if (this.contrasena == '') {
    this.msgPassword = true;
    setTimeout(() => {
      this.msgPassword = false;
    }, 3000);
    this.hayerrores = true;
  }
  if (this.hayerrores) {
    return;
  }
  this.acceder = false;
  this.carga = true;
  this.accediendo = true;

  this.servicio
    .registrar(this.nombreCom, this.contrasena)
    .subscribe((retorno: any) => {
      this.accediendo = false;

      if (retorno.resultado == true) {
        this.servicio.token = retorno.token;
        localStorage.setItem('token', retorno.token);
          if (retorno.estado == 1) {
             this.router.navigate(['dashboard/grafico']);
          } else {
             this.router.navigate(['home']);
          }
          setTimeout(() => {
            this.carga = false;
            this.acceder = true;
          }, 3000);
       
      } else {
        this.carga = false;
        this.acceder = true;
        this.msgError = true;
        setTimeout(() => {
          this.msgError = false;
        }, 3000);
      }
    });
}
}
