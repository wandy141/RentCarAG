import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor() {

  }

  list = [
    { nombre: 'Económico', imagen: '/assets/kia picanto.png' , ruta:'economico'},
    { nombre: 'Lujo', imagen: '/assets/lujo.webp', ruta:'lujo' },
    { nombre: 'SUV', imagen: '/assets/suv.webp', ruta:'camion' },
    { nombre: 'Compacto', imagen: '/assets/compacto.webp', ruta:'compacto' },
    { nombre: 'Premium', imagen: '/assets/premium.webp', ruta:'premium' },
    { nombre: 'Normal', imagen: '/assets/normal.webp', ruta:'normal' },
  ];
}