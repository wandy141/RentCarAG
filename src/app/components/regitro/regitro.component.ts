import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-regitro',
  templateUrl: './regitro.component.html',
  styleUrls: ['./regitro.component.css'],
})
export class RegitroComponent {
  msgUsuario: boolean = false;
  msgPassword: boolean = false;
  msgFail: boolean = false;
  usuario: any = '';
  password: any = '';
  accediendo: boolean = false;
  hayerrores: boolean = false;
  acceder:boolean = true;
  carga:boolean = false;
  constructor( public router: Router, public servicio: ApiDBService) {
  }

  mesajeError() {
    if (this.accediendo) {
      return;
    }

    this.msgUsuario = false;
    this.msgPassword = false;
    this.accediendo = false;
    this.hayerrores = false;
    this.acceder = true;
    this.carga = false;

    if (this.usuario == '') {
      this.msgUsuario = true;
      setTimeout(() => {
      this.msgUsuario = false;
      }, 3000);
      this.hayerrores = true;
    }

    if (this.password == '') {
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
    setTimeout(() => {
    
        this.servicio.login(this.usuario,this.password).subscribe((retorno:any) => {
          this.accediendo = false;
         
          if (retorno.resultado == true) {
            this.servicio.token = retorno.token;
            localStorage.setItem('token', retorno.token);
            this.router.navigate(['home']);
          } else  {
            this.msgFail = true;
            setTimeout(() => {
            this.msgFail = false;
            }, 3000);
          }
        });
    }, 1000);
  }
}
