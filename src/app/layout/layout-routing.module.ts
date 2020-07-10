import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { RoleAdminManagerGuard } from '../guards/role-admin-manager-guard.service';
import { RoleOperatorGuard } from '../guards/role-operator-guard.service';
import { AdministrationGuard } from '../guards/administration-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
      { path: 'inicio', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
      // { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
      // { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
      // { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
      { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
      { path: 'insumos', loadChildren: () => import('./secciones/insumos/insumos.module').then(m => m.InsumosModule) },
      {
        path: 'gestion', loadChildren: () =>
          import('./secciones/gestion-municipio/gestion-municipio.module').then(m => m.GestionMunicipioModule),
        canActivate: [RoleAdminManagerGuard]
      },
      { path: 'poc', loadChildren: () => import('./poc/poc.module').then(m => m.PocModule) },
      {
        path: 'administrador', loadChildren: () =>
          import('./secciones/administrador/administrador.module').then(m => m.AdministradorModule),
        canActivate: [AdministrationGuard]
      },
      {
        path: 'cuenta', loadChildren: () =>
          import('./secciones/cuenta/account.module').then(m => m.AccountModule)
      },
      {
        path: 'operador', loadChildren: () =>
          import('./secciones/operacion/operacion.module').then(m => m.OperacionModule),
        canActivate: [RoleOperatorGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
