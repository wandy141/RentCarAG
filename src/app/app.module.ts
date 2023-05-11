import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegitroComponent } from './components/regitro/regitro.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CarroComponent } from './components/carro/carro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VehiculoConsultaComponent } from './components/vehiculo-consulta/vehiculo-consulta.component';
import { SliderComponent } from './components/slider/slider.component';
import { TipoVehiculoComponent } from './components/tipo-vehiculo/tipo-vehiculo.component';
import { ApiDBService } from './services/api-db.service';
import { ConsultaEconomicoComponent } from './components/consulta-economico/consulta-economico.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';


@NgModule({
  declarations: [
    AppComponent,
    RegitroComponent,
    NavBarComponent,
    HomeComponent,
    ClienteComponent,
    CarroComponent,
    UsuarioComponent,
    VehiculoConsultaComponent,
    SliderComponent,
    TipoVehiculoComponent,
    ConsultaEconomicoComponent,
    AlquilerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    ApiDBService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
