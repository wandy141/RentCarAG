import { Component,OnInit} from '@angular/core';
import { ApiDBService } from 'src/app/services/api-db.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit  {

constructor(private servicio:ApiDBService) {

}
ngOnInit(): void {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dia = String(today.getDate() + 2).padStart(2, '0');
  const hora = String(today.getHours()).padStart(2, '0');

  const minutos = String(today.getMinutes()).padStart(2, '0');

  this.fechaini = `${yyyy}-${mm}-${dd} ${hora}:${minutos}`;
  this.fechafin = `${yyyy}-${mm}-${dia} ${hora}:${minutos}`;

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
actualizarFechasSeleccionadas() {
const fechas = {
  fechaIni: this.fechaini,
  fechaFin: this.fechafin,
  entrega: this.entrega,
  devolucion:this.devolucion
};

this.servicio.actualizarFechas(fechas);
}

}
