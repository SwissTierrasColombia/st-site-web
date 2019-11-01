import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { RoleAdminGuard } from 'src/app/guards/role-admin-guard.service';


const routes: Routes = [{
  path: 'usuarios',
  component: MainLayoutComponent,
  canActivate: [AuthGuard, RoleAdminGuard],
  children: [
    {
      path: '', component: ListUsersComponent,
    },
    {
      path: 'nuevo', component: CreateUserComponent,
    },
    {
      path: 'actualizar/:idUser/:userName', component: UpdateUserComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
