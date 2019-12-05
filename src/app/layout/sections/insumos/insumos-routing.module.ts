import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargueComponent } from './cargue/cargue.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { IntegracionComponent } from './integracion/integracion.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { RoleManagerGuard } from 'src/app/guards/role-manager-guard.service';
import { RoleProviderGuard } from 'src/app/guards/role-provider-guard.service';


const routes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent,
    canActivate: [RoleProviderGuard]
  },
  {
    path: 'cargue/:idInsumo',
    component: CargueComponent,
    canActivate: [RoleProviderGuard]
  },
  {
    path: 'integracion',
    component: IntegracionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumosRoutingModule { }
