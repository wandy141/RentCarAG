import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css']
})
export class SlideBarComponent {
  constructor(public router: Router){

  }

  msgSalir(){
    
    Swal.fire({
      title: '¿Deseas salir?',
      icon: 'warning',
      iconColor: '#FF0000',
      showCancelButton: true,
      confirmButtonText: 'salir',
      confirmButtonColor: '#FF0000',
      cancelButtonText: 'Regresar'
         }).then((resultado) => {
      if (resultado.value) {
        sessionStorage.removeItem('loggedIn');
        this.router.navigate(['']);
      } else {

      }
    });
  }
 

}
