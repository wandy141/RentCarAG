import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';
import { PruebaComponent } from '../prueba/prueba.component';
import { AlquilerComponent } from '../alquiler/alquiler.component';
import { ApiDBService } from 'src/app/services/api-db.service';
import { CarroComponent } from '../carro/carro.component';
import { DashboardComponent } from './dashboard.component';
import { TipoVehiculoComponent } from '../tipo-vehiculo/tipo-vehiculo.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'usuario', component :UsuarioComponent},
      {path: 'pr', component :PruebaComponent },
      {path: 'rentar', component :AlquilerComponent },
      {path: 'usuario', component :UsuarioComponent,canActivate: [ApiDBService]},
      {path: 'carros', component :CarroComponent},
      {path: 'carroT', component :TipoVehiculoComponent},
      { path: '**', redirectTo: '/login'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
