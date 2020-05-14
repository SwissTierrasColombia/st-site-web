import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RoleProviderDirectorGuard } from 'src/app/guards/role-providerDirector-guard.service';
import { GestorComponent } from './gestor/gestor.component';
import { OperadorComponent } from './operador/operador.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { RoleAdminGuard } from 'src/app/guards/role-admin-guard.service';

const routes: Routes = [
  {
    path: 'crear-usuario',
    component: CreateUserComponent

  },
  {
    path: 'usuarios',
    component: ListUserComponent
  },
  {
    path: 'usuario/:idUser/modificar',
    component: UpdateUserComponent
  },
  {
    path: 'crear/perfil',
    component: ProfilesComponent,
    canActivate: [RoleProviderDirectorGuard]
  },
  {
    path: 'crear/gestor',
    component: GestorComponent,
    canActivate: [RoleAdminGuard]
  },
  {
    path: 'crear/operador',
    component: OperadorComponent,
    canActivate: [RoleAdminGuard]
  },
  {
    path: 'crear/proveedor',
    component: ProveedorComponent,
    canActivate: [RoleAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
