import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegitroComponent } from './components/regitro/regitro.component';
import { HomeComponent } from './components/home/home.component';
import { VehiculoConsultaComponent } from './components/vehiculo-consulta/vehiculo-consulta.component';
import { ConsultaEconomicoComponent } from './components/consulta-economico/consulta-economico.component';
import { SlideBarComponent } from './components/slide-bar/slide-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApiDBService } from './services/api-db.service';

const routes: Routes = [
  {path: '', component :RegitroComponent, pathMatch:'full'},
  {path: 'login', component :RegitroComponent},
  {path: 'home', component :HomeComponent },
  {path: 'carroC', component :VehiculoConsultaComponent, },
  {path: 'tipo', component :ConsultaEconomicoComponent },
  {path: 'slide', component :SlideBarComponent },
  {path: 'dashboard', component :DashboardComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
    , canActivate: [ApiDBService]
  },
  { path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
