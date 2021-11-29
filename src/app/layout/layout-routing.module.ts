import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { RoleManagerOperatorGuard } from '../shared/guard/role-manager-operator-guard.service';
import { RoleOperatorGuard } from '../shared/guard/role-operator-guard.service';
import { AdministrationGuard } from '../shared/guard/administration-guard.service';
import { RoleAdminManagerGuard } from '../shared/guard/role-admin-manager-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
      {
        path: 'inicio',
        loadChildren: () =>
          import('./home/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'insumos',
        loadChildren: () =>
          import('../sections/supplies/insumos.module').then(
            (m) => m.InsumosModule
          ),
      },
      {
        path: 'gestion',
        loadChildren: () =>
          import(
            '../sections/municipality-management/gestion-municipio.module'
          ).then((m) => m.GestionMunicipioModule),
        canActivate: [RoleAdminManagerGuard],
      },
      {
        path: 'administrador',
        loadChildren: () =>
          import('../sections/administrator/administrador.module').then(
            (m) => m.AdministradorModule
          ),
        canActivate: [AdministrationGuard],
      },
      {
        path: 'cuenta',
        loadChildren: () =>
          import('../sections/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'operador',
        loadChildren: () =>
          import('../sections/operation/operacion.module').then(
            (m) => m.OperacionModule
          ),
        canActivate: [RoleOperatorGuard],
      },
      {
        path: 'calidad',
        loadChildren: () =>
          import('../sections/lev-cat-reception/lev-cat-reception.module').then(
            (m) => m.LevCatReceptionModule
          ),
        canActivate: [RoleManagerOperatorGuard],
      },
      {
        path: 'sinic',
        loadChildren: () =>
          import('../sections/sinic/sinic.module').then((m) => m.SinicModule),
        canActivate: [RoleAdminManagerGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
