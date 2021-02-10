import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccounSettingsComponent } from './accoun-settings/accoun-settings.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [

  {
    path: 'dashboard', component: PagesComponent,
    canActivate: [AuthGuard],
    //rutas hijas de dashboard
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBAr' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
      { path: 'settings', component: AccounSettingsComponent, data: { titulo: 'Ajustes' } },
      { path: 'rjxs', component: RjxsComponent, data: { titulo: 'Rjxs' } },

      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
