import { Component} from '@angular/core';
import { ApiDBService } from 'src/app/services/api-db.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent   {

constructor(private servicio:ApiDBService){

}
fechaini:string = '';
fechafin:string = '';
entrega:string = '';
devolucion:string = '';
dias:number = 0;
  onClickEnviarValores() {
    this.servicio.setInputValue(this.fechaini, this.fechafin,this.entrega,this.devolucion);
    this.calculateDays();
    this.diasTotales();
  }
  
diasTotales(){
  if (this.fechaini && this.fechafin) {
  this.servicio.setDias(this.dias);
  }
}
calculateDays() {
  if (this.fechaini && this.fechafin) {
    const start = new Date(this.fechaini);
    const end = new Date(this.fechafin);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    this.dias = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1);
  }
}



}
