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
    { nombre: 'Lujo', imagen: '/assets/kia picanto.png', ruta:'lujo' },
    { nombre: 'Camión', imagen: '/assets/kia picanto.png', ruta:'camion' },
    { nombre: 'Compacto', imagen: '/assets/kia picanto.png', ruta:'compacto' },
    { nombre: 'Premium', imagen: '/assets/kia picanto.png', ruta:'premium' },
    { nombre: 'Deportivo', imagen: '/assets/kia picanto.png', ruta:'deportivo' },
  ];
}