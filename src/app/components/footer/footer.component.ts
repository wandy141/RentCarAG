import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

   fechaActual = new Date();
   anoActual = this.fechaActual.getFullYear();
}
