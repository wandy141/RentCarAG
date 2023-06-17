import { Component } from '@angular/core';
import { registro } from '../clasebd/registro';
import { ApiDBService } from '../services/api-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombreCom:string = '';
  correo: string = '';
  contrasena: string = '';
  confirmacionContra: string = '';
  error: boolean = false;

  constructor(public router: Router, public servicio: ApiDBService) {}

guardarRegistro(){
  this.error = false;
  let registrotmp: registro = new registro();
  registrotmp.nombreCom = this.nombreCom;
  registrotmp.correo = this.correo;
  registrotmp.contraseña = this.contrasena;
  registrotmp.confirmacionContra = this.confirmacionContra;

  if (this.error) {
    return;
  }

  this.servicio
        .insertarRegistro(registrotmp)
        .subscribe((resultado: boolean) => {
        console.log('se hizo');
        });
}
}
