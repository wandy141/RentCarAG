import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vehiculo } from 'src/app/clasebd/vehiculo';
import { ApiDBService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-consulta-economico',
  templateUrl: './consulta-economico.component.html',
  styleUrls: ['./consulta-economico.component.css']
})
export class ConsultaEconomicoComponent implements OnInit {
  lista: Array<vehiculo> = [];
  fechaInicio:string = '';
  fechaFinal:string = '';
  entrega:string = '';
  devolucion:string = '';
  acceso:boolean = false;
  constructor(private servicio: ApiDBService, private route: ActivatedRoute, private router: Router) {

  }
  

  ngOnInit(): void {
   

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate() ).padStart(2, '0');
    const dia = String(today.getDate() + 2).padStart(2, '0');
    const hora = String(today.getHours()).padStart(2, '0');
  
    const minutos = String(today.getMinutes()).padStart(2, '0');
  
    this.fechaInicio = `${yyyy}-${mm}-${dd} ${hora}:${minutos}`;
    this.fechaFinal = `${yyyy}-${mm}-${dia} ${hora}:${minutos}`;
  
  
  

    this.servicio.fechas$.subscribe((fechas) => {
      this.fechaInicio = fechas.fechaIni;
      this.fechaFinal = fechas.fechaFin;
      this.entrega = fechas.entrega;
      this.devolucion = fechas.devolucion;
      this.verificar();
      this.route.params.subscribe((data: any) => {
        this.getvalueserve(data?.data)
      });
  
     this.lista;
    });
  
    

    this.route.params.subscribe((data: any) => {
      this.getvalueserve(data?.data)
    });

  }


  
  verificar() {

    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' &&
      this.entrega.length > 0 &&
      this.entrega !== '' &&
      this.devolucion.length > 0 &&
      this.devolucion !== ''
    ) {
      this.acceso = true;
    } else {
      this.acceso = false;
    }
  }


//   buscarAutos() {
//     if (
//       this.fechaInicio !== '' &&
//       this.fechaFinal !== '' ){
//     this.servicio.buscarAutosDisponibles(this.fechaInicio, this.fechaFinal)
//       .subscribe((response) => {
//         this.lista = response;
//       });
//     }

// }


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
        retorno = 'Deportivo'
        break;

      case 4:
        retorno = 'Premium'
        break;

      case 5:
        retorno = 'Lujo'
        break;

      case 6:
        retorno = 'SUV'
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
      case 'suv':
        this.todoCamion();
      
        break;
      case 'compacto':
        this.todoCompacto();
        break;
      case 'premium':
        this.todoPremium();
        break;
      case 'deportivo':
        this.todoNormal();
        break;

    }

  }


 







  todoLujo() {
    
    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' ){
    this.servicio.lujoWeb(this.fechaInicio, this.fechaFinal).subscribe(
      (   response: any) => {
        this.lista = response;
      },
      (      error: any) => {
        console.error(error);
      }
    );
      }

  }

  todoEconomico() {
    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' ){
    this.servicio.camionWeb(this.fechaInicio, this.fechaFinal).subscribe(
      (   response: any) => {
        this.lista = response;
      },
      (      error: any) => {
        console.error(error);
      }
    );
      }
  }

  todoCompacto() {
    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' ){
    this.servicio.compactoWeb(this.fechaInicio, this.fechaFinal).subscribe(
      (   response: any) => {
        this.lista = response;
      },
      (      error: any) => {
        console.error(error);
      }
    );
      }
  }

  todoNormal() {
    
    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' ){
    this.servicio.normalWeb(this.fechaInicio, this.fechaFinal).subscribe(
      (   response: any) => {
        
        this.lista = response;
      },
      (      error: any) => {
        console.error(error);
      }
    );
      }
  }

  todoPremium() {
    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' ){
    this.servicio.premiumWeb(this.fechaInicio, this.fechaFinal).subscribe(
      (   response: any) => {
        this.lista = response;
      },
      (      error: any) => {
        console.error(error);
      }
    );
      }
  }

  todoCamion() {
    if (
      this.fechaInicio !== '' &&
      this.fechaFinal !== '' ){
    this.servicio.camionWeb(this.fechaInicio, this.fechaFinal).subscribe(
      (   response: any) => {
        this.lista = response;
      },
      (      error: any) => {
        console.error(error);
      }
    );
      }
  }


  
  visualizar(obj: any) {
    this.servicio.setData(obj);
    this.router.navigate(['recepcion']);
  }
}
