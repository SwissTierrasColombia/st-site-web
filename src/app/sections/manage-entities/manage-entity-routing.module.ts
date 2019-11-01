import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { RoleAdminGuard } from 'src/app/guards/role-admin-guard.service';
import { ListEntityComponent } from './list-entity/list-entity.component';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { UpdateEntityComponent } from './update-entity/update-entity.component';


const routes: Routes = [{
  path: 'entidades',
  component: MainLayoutComponent,
  canActivate: [AuthGuard, RoleAdminGuard],
  children: [
    {
      path: '', component: ListEntityComponent,
    },
    {
      path: 'nuevo', component: CreateEntityComponent,
    },
    {
      path: 'actualizar/:idEntity/:entityName', component: UpdateEntityComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManageEntityRoutingModule { }
