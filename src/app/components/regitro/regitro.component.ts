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
  letrero: string = 'acceder';
  carga:boolean = false;
  acceder:boolean = true;

  // el contructor se pone prrivada para que funcione dentro de esta pagina y el htp para la conexion con laravel
  // {route es para el cambio de pagina}
  constructor( public router: Router, public servicio: ApiDBService) {
    console.log('Login');
  }

  mesajeError() {
    //para no madarle mas de una peticion al momento de oprimir el boto varias veces
    if (this.accediendo) {
      return;
    }

    //declarando la variables  para usarlas como mensaje
    this.msgUsuario = false;
    this.msgPassword = false;
    this.accediendo = false;
    this.hayerrores = false;

    //si el usuario(el input) esta vacio la variable del donde esta en mensaje va a presentar
    if (this.usuario == '') {
      this.msgUsuario = true;
      setTimeout(() => {
      this.msgUsuario = false;
      }, 3000);
      this.hayerrores = true;
    }

    //si el contraseña(el input) esta vacio la variable del donde esta en mensaje va a presentar
    if (this.password == '') {
      this.msgPassword = true;
      setTimeout(() => {
        this.msgPassword = false;  
      }, 3000);
      this.hayerrores = true;
    }
    //esto es para si hay algun error el boton no cambie o recargue
    //la variable esta definida falso pero si un error se ejecuta va a convertirse true
    //y se va a devolver antes de que se ejecute el boton
    if (this.hayerrores) {
      return;
    }
    this.acceder = false;
    this.carga = true;
    this.accediendo = true;
    this.letrero = 'accediendo';
    //set timeout es para que el tiempo de carga dure mas
    setTimeout(() => {
      // a la url de la api le mandamos le hacemos la peticion de lo queremos
    
        this.servicio.login(this.usuario,this.password).subscribe((retorno) => {
          console.log(retorno);
          this.accediendo = false;
          this.letrero = 'acceder';
          this.acceder = true;
          //aqui si el retorno que viene siendo la peticion a la api sal correcta te a mandar a otra pagina
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
