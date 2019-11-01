import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { RoleAdminGuard } from 'src/app/guards/role-admin-guard.service';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { UpdateRolesComponent } from './update-roles/update-roles.component';


const routes: Routes = [{
  path: 'roles',
  component: MainLayoutComponent,
  canActivate: [AuthGuard, RoleAdminGuard],
  children: [
    {
      path: '', component: ListRolesComponent,
    },
    {
      path: 'nuevo', component: CreateRolesComponent,
    },
    {
      path: 'actualizar/:idRol/:roleName', component: UpdateRolesComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManageRolesRoutingModule { }
