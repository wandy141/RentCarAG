import { Component } from '@angular/core';
import { cliente } from 'src/app/clasebd/cliente';
import { ApiDBService } from 'src/app/services/api-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent {
  idclientetxt: number = 0;
  nombretxt: string = '';
  correotxt: string = '';
  cedulatxt: string = '';
  telefono: string = '';
  direccion: string = '';

  listaClientes: Array<cliente> = [];

  constructor(public servicio: ApiDBService) {
    this.getClientes();
  }

  getClientes() {
    this.servicio.mostrarCliente().subscribe((listado: any) => {
      this.listaClientes = listado;
    });
  }

  seleccionarCliente(objCliente: cliente) {
    this.idclientetxt = objCliente.idcliente;
    this.nombretxt = objCliente.nombre;
    this.correotxt = objCliente.correo;
    this.cedulatxt = objCliente.cedula;
  }

  guardarCliente() {
    let clientetmp: cliente = new cliente();
    clientetmp.idcliente = this.idclientetxt;
    clientetmp.nombre = this.nombretxt;
    clientetmp.correo = this.correotxt;
    clientetmp.cedula = this.cedulatxt;
    clientetmp.telefono = this.telefono;
    clientetmp.direccion = this.direccion;

    if (this.idclientetxt == null || this.idclientetxt == undefined) {
      this.msgNulo();
      return;
    }

    if (this.nombretxt == '') {
      this.msgNulo();
      return;
    }

    if (this.telefono == '') {
      this.msgNulo();
      return;
    }

    if (this.direccion == '') {
      this.msgNulo();
      return;
    }

    if (this.correotxt == '') {
      this.msgNulo();
      return;
    }

    if (this.cedulatxt == '') {
      this.msgNulo();
      return;
    }

    this.servicio
      .insertarCliente(clientetmp)
      .subscribe((resultado: boolean) => {
        if (resultado) {
          this.limpiar();
          this.getClientes();
          this.msgExitoGuardar(clientetmp.nombre);
        } else if (resultado == false) {
          this.msgFail();
        }
      });
  }

  llenarCliente(idcliente: number) {
    this.servicio.clientexId(idcliente).subscribe((resultado: any) => {
      this.seleccionarCliente;

      if (idcliente != null) {
        this.idclientetxt = resultado.idcliente;
        this.nombretxt = resultado.nombre;
        this.correotxt = resultado.correo;
        this.cedulatxt = resultado.cedula;
        this.telefono = resultado.telefono;
        this.direccion = resultado.direccion;
      }
    });
  }

  limpiar() {
    this.idclientetxt = 0;
    this.nombretxt = '';
    this.correotxt = '';
    this.cedulatxt = '';
    this.telefono = '';
    this.direccion = '';
  }

  eliminar(usuarioid: string) {
    this.servicio.borrarUser(usuarioid).subscribe((response: any) => {
      this.limpiar();
      this.getClientes();
      this.msgExitoBorrar(usuarioid);
    });
  }

  msgExitoBorrar(nombreCli: string) {
    Swal.fire(
      'Éxito',
      '¡Se a eliminado el cliente ' + nombreCli + '!',
      'success'
    );
  }

  msgExitoGuardar(nombreCli: string) {
    Swal.fire(
      'Éxito',
      '¡Se a Registrado el cliente ' + nombreCli + '!',
      'success'
    );
  }

  msgFallo() {
    Swal.fire('Oops...', '¡Verifique si los campos estan vacios!', 'error');
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
      title: 'Cliente: ' + this.nombretxt,
      text: '¿Deseas eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.value) {
        this.eliminar(this.nombretxt);
      } else {
      }
    });
  }

  capitalize(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
