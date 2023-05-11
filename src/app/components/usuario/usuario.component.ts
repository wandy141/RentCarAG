import { Component } from '@angular/core';
import { usuarios } from 'src/app/clasebd/usuarios';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  usuarioid: string = '';
  contrasena: string = '';
  nombre: string = '';
  estado: number = 2;
  error: boolean = false;
  msgFail: boolean = false;
  msgNombre: boolean = false;
  msgContrasena: boolean = false;
  msgEstado: boolean = false;
  modalOpen:boolean = false;


  

  listadoUsuarios: Array<usuarios> = [];

  constructor(public servicio: ApiDBService) {
 
    this.getUsuarios();
  }

  getUsuarios() {
    this.servicio.mostrarUsuario().subscribe((listado:any) => {
      this.listadoUsuarios = listado;
    });
  }

  seleccionarUsuario(objUsuario: usuarios) {
    this.usuarioid = objUsuario.usuarioid;
    this.contrasena = objUsuario.contrasena;
    this.nombre = objUsuario.nombre;
    this.estado = objUsuario.estado;
  }

  guardarUsuario() {
    this.error = false;

    let usuariotmp: usuarios = new usuarios();
    usuariotmp.usuarioid = this.usuarioid;
    usuariotmp.contrasena = this.contrasena;
    usuariotmp.nombre = this.nombre;
    usuariotmp.estado = this.estado;

    if (this.usuarioid == '') {
      this.error = true;
      this.msgFail = true;
      setTimeout(() => {
        this.msgFail = false;
      }, 3000);
    }

    if (this.nombre == '') {
      this.error = true;
      this.msgNombre = true;
      setTimeout(() => {
        this.msgNombre = false;
      }, 3000);
    }

    if (this.contrasena == '') {
      this.error = true;
      this.msgContrasena = true;
      setTimeout(() => {
        this.msgContrasena = false;
      }, 3000);
    }

    if (this.estado == 2) {
      this.error = true;
      this.msgEstado = true;
      setTimeout(() => {
        this.msgEstado = false;
      }, 3000);
    }

    if (this.error) {
      return;
    }

    this.servicio.insertarUsuario(usuariotmp).subscribe((resultado:any) => {
      console.log(resultado);
      if (resultado) {
        this.limpiar();
        this.getUsuarios();
        this.msgExitoGuardar(usuariotmp.usuarioid);
      }
    });
  }

  llenarUsuario(usuarioid: string) {
    this.servicio.llenarTablaUser(usuarioid).subscribe((resultado:any) => {
      console.log(resultado);
      this.seleccionarUsuario;

      if (usuarioid != null) {
        this.usuarioid = resultado.usuarioid;
        this.nombre = resultado.nombre;
        this.contrasena = resultado.contrasena;
        this.estado = resultado.estado;
      }
    });
  }

  limpiar() {
    this.usuarioid = '';
    this.contrasena = ''; 
    this.nombre = '';
    this.estado = 2;
  }

  eliminar(usuarioid: string) {
    this.servicio.borrarUser(usuarioid).subscribe((response:any) => {
  
      this.limpiar();
      this.getUsuarios();
      this.msgExitoBorrar(usuarioid);
    });
  }

  msgExitoBorrar(usuarioid: string) {
    Swal.fire(
      'Éxito',
      '¡Se a eliminado el usuario ' + usuarioid + '!',
      'success'
    );
  }

  msgExitoGuardar(usuarioid: string) {
    Swal.fire(
      'Éxito',
      '¡Se a Registrado el usuario ' + usuarioid + '!',
      'success'
    );
  }

  msgFallo() {
    Swal.fire(
      'Oops...',
      '¡El usuario no existe y/o los campos estan vacios!',
      'error'
    );
  }

  msgPrecaucion(usuarioid: string) {
    if (usuarioid == null || usuarioid == '' || usuarioid == undefined) {
      this.msgFallo();
      return;
    }
    Swal.fire({
      title: 'Usuario: ' + this.usuarioid,
      text: '¿Deseas eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.value) {
        this.eliminar(this.usuarioid);
      } else {
      }
    });
  }



  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  // expresiones = {
  // 	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  // 	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  // 	password: /^.{4,12}$/, // 4 a 12 digitos.
  // 	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  // 	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  // }

  // validarContrasena() {
  //   if (this.expresiones.usuario.test(this.usuarioid)) {
  //     this.check = true;
  //     console.log('Válido');
  //   } else {
  //     this.check = false;
  //     console.log('Inválido');
  //   }
  // }
}
