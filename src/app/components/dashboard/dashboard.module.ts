import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsuarioComponent } from '../usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarroComponent } from '../carro/carro.component';
import { TipoVehiculoComponent } from '../tipo-vehiculo/tipo-vehiculo.component';
import { AlquilerComponent } from '../alquiler/alquiler.component';
import { PruebaComponent } from '../prueba/prueba.component';
import { ApiDBService } from 'src/app/services/api-db.service';
import { DashboardComponent } from './dashboard.component';
import { SlideBarComponent } from '../slide-bar/slide-bar.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { GraficoComponent } from '../grafico/grafico.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SlideBarComponent,
    UsuarioComponent,
    CarroComponent,
    TipoVehiculoComponent,
    AlquilerComponent,
    PruebaComponent,
    ClienteComponent,
    GraficoComponent
  ],
  imports: [
    CommonModule,
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
