import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-consulta-economico',
  templateUrl: './consulta-economico.component.html',
  styleUrls: ['./consulta-economico.component.css']
})
export class ConsultaEconomicoComponent implements OnInit {
  lista: Array<vehiculo> = [];
  constructor(public servicio: ApiDBService, public route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      console.log(data)
      this.getvalueserve(data?.data)
    })
  }


  getDescripcionTipo(tipo: number) {
    let retorno: string = 'tipo';
    switch (tipo) {
      case 1:
        retorno = 'Economico'
        break;

      case 2:
        retorno = 'Compacto'
        break;

      case 3:
        retorno = 'Tamaño Normal'
        break;

      case 4:
        retorno = 'Premium'
        break;

      case 5:
        retorno = 'Lujo'
        break;

      case 6:
        retorno = 'Camion'
        break;

    }
    return retorno;
  }


  getvalueserve(tipo: string) {
    this.lista = [];
    switch (tipo) {
      case 'economico':
        this.todoEconomico();
        break;
      case 'lujo':
        this.todoLujo();
        break;
      case 'camion':
        this.todoCamion();
        break;
      case 'compacto':
        this.todoCompacto();
        break;
      case 'premium':
        this.todoPremium();
        break;
      case 'normal':
        this.todoNormal();
        break;

    }

  }


  todoLujo() {
    this.servicio.lujo().subscribe(resultado => {
      this.lista = resultado
    });

  }

  todoEconomico() {
    this.servicio.economico().subscribe(resultado => {
      this.lista = resultado
    });
  }

  todoCompacto() {
    this.servicio.compacto().subscribe(resultado => {
      this.lista = resultado
    });
  }

  todoNormal() {
    this.servicio.normal().subscribe(resultado => {
      this.lista = resultado
    });
  }

  todoPremium() {
    this.servicio.premium().subscribe(resultado => {
      this.lista = resultado
    });
  }

  todoCamion() {
    this.servicio.camion().subscribe(resultado => {
      this.lista = resultado
    });
  }


  
}
