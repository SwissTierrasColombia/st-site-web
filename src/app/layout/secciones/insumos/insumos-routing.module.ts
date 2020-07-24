import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargueComponent } from './cargue/cargue.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { IntegracionComponent } from './integracion/integracion.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { RoleManagerGuard } from 'src/app/guards/role-manager-guard.service';
import { RoleProviderGuard } from 'src/app/guards/role-provider-guard.service';
import { SearchComponent } from './buscar/search.component';
import { EntregarComponent } from './entregar/entregar.component';
import { SolicitudesAtendidasComponent } from './solicitudes-atendidas/solicitudes-atendidas.component';
import { AtendidaComponent } from './atendida/atendida.component';
import { CrearTipoInsumoComponent } from './crear-tipo-insumo/crear-tipo-insumo.component';
import { RoleProviderDirectorGuard } from 'src/app/guards/role-providerDirector-guard.service';
import { BuscarSolicitudComponent } from './buscar-solicitud/buscar-solicitud.component';
import { IntegrationsRunningComponent } from './integrations-running/integrations-running.component';
import { IntegrationsPossiblesComponent } from './integrations-possibles/integrations-possibles.component';
import { RevisionesPendientesComponent } from './revisiones-pendientes/revisiones-pendientes.component';
import { RoleRevisorGuard } from 'src/app/guards/role-revisor-guard.service';
import { RevisionPendienteComponent } from './revision-pendiente/revision-pendiente.component';


const routes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'solicitudes/pendientes',
    component: SolicitudesComponent,
    canActivate: [RoleProviderGuard]
  },
  {
    path: 'solicitudes/pendientes/cargar/:idInsumo',
    component: CargueComponent,
    canActivate: [RoleProviderGuard]
  },
  {
    path: 'integracion',
    component: IntegracionComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'buscar',
    component: SearchComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'buscar-solicitud',
    component: BuscarSolicitudComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'entrega',
    component: EntregarComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'solicitudes/atendidas',
    component: SolicitudesAtendidasComponent,
    canActivate: [RoleProviderGuard]
  },
  {
    path: 'solicitudes/atendidas/ver/:idInsumo',
    component: AtendidaComponent,
    canActivate: [RoleProviderGuard]
  },
  {
    path: 'caracterizacion/insumo',
    component: CrearTipoInsumoComponent,
    canActivate: [RoleProviderDirectorGuard]
  },
  {
    path: 'integraciones-corriendo',
    component: IntegrationsRunningComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'integraciones-posibles',
    component: IntegrationsPossiblesComponent,
    canActivate: [RoleManagerGuard]
  },
  {
    path: 'revisiones-pendientes',
    component: RevisionesPendientesComponent,
    canActivate: [RoleRevisorGuard]
  },
  {
    path: 'revisiones-pendientes/registros/:supplyRequestedId',
    component: RevisionPendienteComponent,
    canActivate: [RoleRevisorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumosRoutingModule { }
