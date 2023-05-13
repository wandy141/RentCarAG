import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsuarioComponent } from '../usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { CarroComponent } from '../carro/carro.component';
import { TipoVehiculoComponent } from '../tipo-vehiculo/tipo-vehiculo.component';
import { AlquilerComponent } from '../alquiler/alquiler.component';
import { PruebaComponent } from '../prueba/prueba.component';
import { ApiDBService } from 'src/app/services/api-db.service';
import { DashboardComponent } from './dashboard.component';
import { SlideBarComponent } from '../slide-bar/slide-bar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    CarroComponent,
    TipoVehiculoComponent,
    AlquilerComponent,
    PruebaComponent,
    SlideBarComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DashboardRoutingModule,
  ],
  
  providers: [
    ApiDBService
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
