import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RoleProviderDirectorGuard } from 'src/app/shared/guard/role-providerDirector-guard.service';
import { GestorComponent } from './manager/gestor.component';
import { OperadorComponent } from './operator/operador.component';
import { ProveedorComponent } from './provider/proveedor.component';
import { RoleAdminGuard } from 'src/app/shared/guard/role-admin-guard.service';

const routes: Routes = [
  {
    path: 'crear-usuario',
    component: CreateUserComponent,
  },
  {
    path: 'usuarios/:tab',
    component: ListUserComponent,
  },
  {
    path: 'usuario/:idUser/modificar/:tab',
    component: UpdateUserComponent,
  },
  {
    path: 'crear/area-trabajo',
    component: ProfilesComponent,
    canActivate: [RoleProviderDirectorGuard],
  },
  {
    path: 'crear/gestor',
    component: GestorComponent,
    canActivate: [RoleAdminGuard],
  },
  {
    path: 'crear/operador',
    component: OperadorComponent,
    canActivate: [RoleAdminGuard],
  },
  {
    path: 'crear/proveedor',
    component: ProveedorComponent,
    canActivate: [RoleAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
