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
  estado: number = 3;
  error: boolean = false;
  activo: any = 1;
  inactivo: any = 0;
  visita: any = 2;

  listadoUsuarios: Array<usuarios> = [];

  constructor(public servicio: ApiDBService) {
    this.getUsuarios();
  }

  getUsuarios() {
    this.servicio.mostrarUsuario().subscribe((listado: any) => {
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
      this.msgNulo();
    }

    if (this.nombre == '') {
      this.error = true;
      this.msgNulo();
    }

    if (this.contrasena == '') {
      this.error = true;
      this.msgNulo();
    }

    if (this.estado == 3) {
      this.error = true;
      this.msgNulo();
    }

    if (this.error) {
      return;
    }

    this.servicio.insertarUsuario(usuariotmp).subscribe((resultado: boolean) => {
      console.log(resultado);
      if (resultado) {
        this.limpiar();
        this.getUsuarios();
        this.msgExitoGuardar(usuariotmp.usuarioid);
      } else if (!resultado) {
        this.msgFail();
      }
    });
  }

  llenarUsuario(usuarioid: string) {
    this.servicio.llenarTablaUser(usuarioid).subscribe((resultado: any) => {
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
    this.estado = 3;
  }

  eliminar(usuarioid: string) {
    this.servicio.borrarUser(usuarioid).subscribe((response: any) => {
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

  msgFail() {
    Swal.fire({
      title: 'Oops...',
      text: 'Se produjo algun Error',
      icon: 'warning',
      iconColor: 'red',
      confirmButtonText: 'OK',
    });
  }

  msgNulo() {
    Swal.fire('Oops...', '¡Ocurrio algo verfica los campos!', 'error');
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
