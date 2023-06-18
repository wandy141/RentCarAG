import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-regitro',
  templateUrl: './regitro.component.html',
  styleUrls: ['./regitro.component.css'],
})
export class RegitroComponent {
  msgPassword: boolean = false;
  usuario: any = '';
  password: any = '';
  accediendo: boolean = false;
  hayerrores: boolean = false;
  acceder: boolean = true;
  carga: boolean = false;
  msgError: boolean = false;
  constructor(public router: Router, public servicio: ApiDBService) {}

  mesajeError() {
    this.msgPassword = false;
    this.accediendo = false;
    this.hayerrores = false;
    this.acceder = true;
    this.carga = false;
    if (this.accediendo) {
      return;
    }

   

    if (this.usuario == '') {
      this.msgPassword = true;
      setTimeout(() => {
        this.msgPassword = false;
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

    this.servicio
      .login(this.usuario, this.password)
      .subscribe((retorno: any) => {
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
