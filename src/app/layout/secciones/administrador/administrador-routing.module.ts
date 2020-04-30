import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
