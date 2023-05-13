import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegitroComponent } from './components/regitro/regitro.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CarroComponent } from './components/carro/carro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { VehiculoConsultaComponent } from './components/vehiculo-consulta/vehiculo-consulta.component';
import { TipoVehiculoComponent } from './components/tipo-vehiculo/tipo-vehiculo.component';
import { ApiDBService } from './services/api-db.service';
import { ConsultaEconomicoComponent } from './components/consulta-economico/consulta-economico.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { SlideBarComponent } from './components/slide-bar/slide-bar.component';
import { PruebaComponent } from './components/prueba/prueba.component';

const routes: Routes = [
  {path: '', component :RegitroComponent, pathMatch:'full'},
  {path: 'login', component :RegitroComponent},
  {path: 'home', component :HomeComponent },
  // {path: 'cliente', component :ClienteComponent },
  // {path: 'carro', component :CarroComponent,canActivate: [ApiDBService]},
  // {path: 'usuario', component :UsuarioComponent},
  {path: 'carroC', component :VehiculoConsultaComponent, },
  // {path: 'carroT', component :TipoVehiculoComponent},
  {path: 'tipo', component :ConsultaEconomicoComponent },
  // {path: 'alquiler', component :AlquilerComponent },
  {path: 'slide', component :SlideBarComponent },
  // {path: 'pr', component :PruebaComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },




  { path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
