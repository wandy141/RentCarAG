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

const routes: Routes = [
  {path: '', component :RegitroComponent, pathMatch:'full'},
  {path: 'login', component :RegitroComponent},
  {path: 'home', component :HomeComponent },
  {path: 'cliente', component :ClienteComponent, canActivate: [ApiDBService]},
  {path: 'carro', component :CarroComponent},
  {path: 'usuario', component :UsuarioComponent, canActivate: [ApiDBService]},
  {path: 'carroC', component :VehiculoConsultaComponent, canActivate: [ApiDBService]},
  {path: 'carroT', component :TipoVehiculoComponent, canActivate: [ApiDBService]},
  {path: 'tipo', component :ConsultaEconomicoComponent },

  { path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
