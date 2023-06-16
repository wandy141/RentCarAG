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
  onClickEnviarValores() {
   

    this.servicio.setInputValue(this.fechaini, this.fechafin);
  }
  



}
