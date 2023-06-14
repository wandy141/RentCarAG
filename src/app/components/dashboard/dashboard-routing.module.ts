import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';
import { PruebaComponent } from '../prueba/prueba.component';
import { AlquilerComponent } from '../alquiler/alquiler.component';
import { CarroComponent } from '../carro/carro.component';
import { DashboardComponent } from './dashboard.component';
import { TipoVehiculoComponent } from '../tipo-vehiculo/tipo-vehiculo.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { GraficoComponent } from '../grafico/grafico.component';
import { EntregaComponent } from '../entrega/entrega.component';
import { RecibirComponent } from '../recibir/recibir.component';
import { MantenimientoComponent } from '../mantenimiento/mantenimiento.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'grafico', component :GraficoComponent},
      {path: 'usuario', component :UsuarioComponent},
      {path: 'pr', component :PruebaComponent },
      {path: 'rentar', component :AlquilerComponent },
      {path: 'usuario', component :UsuarioComponent},
      {path: 'carros', component :CarroComponent},
      {path: 'carroT', component :TipoVehiculoComponent},
      {path: 'cliente', component :ClienteComponent},
      {path: 'entrega', component :EntregaComponent},
      {path: 'recibir', component :RecibirComponent},
      {path: 'mantenimiento', component :MantenimientoComponent},


      { path: '**', redirectTo: '/login'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
