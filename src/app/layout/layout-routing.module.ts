import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
      { path: 'inicio', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
      { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
      { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
      { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
      { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
      { path: 'insumos', loadChildren: () => import('./sections/insumos/insumos.module').then(m => m.InsumosModule) },
      {
        path: 'gestion', loadChildren: () =>
          import('./sections/gestion-municipio/gestion-municipio.module').then(m => m.GestionMunicipioModule)
      },
      { path: 'poc', loadChildren: () => import('./poc/poc.module').then(m => m.PocModule) },
      {
        path: 'administrador', loadChildren: () =>
          import('./sections/administrador/administrador.module').then(m => m.AdministradorModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
