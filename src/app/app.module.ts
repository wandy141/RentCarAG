import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegitroComponent } from './components/regitro/regitro.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VehiculoConsultaComponent } from './components/vehiculo-consulta/vehiculo-consulta.component';
import { SliderComponent } from './components/slider/slider.component';
import { ApiDBService } from './services/api-db.service';
import { ConsultaEconomicoComponent } from './components/consulta-economico/consulta-economico.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { RecibirComponent } from './components/recibir/recibir.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    RegitroComponent,
    NavBarComponent,
    HomeComponent,
    VehiculoConsultaComponent,
    SliderComponent,
    ConsultaEconomicoComponent,
    SobreNosotrosComponent,
    RecepcionComponent,
    RecibirComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    ApiDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
