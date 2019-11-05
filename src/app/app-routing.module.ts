import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleAdminGuard } from './guards/role-admin-guard.service';


const routes: Routes = [{
  path: '',
  redirectTo: '/autenticacion/login',
  canActivate: [AuthGuard, RoleAdminGuard],
  pathMatch: 'full'
}
  /*   ,
  {
    path: '**',
    redirectTo: '/error/not-found',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
