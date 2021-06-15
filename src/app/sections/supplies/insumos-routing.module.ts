import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleManagerGuard } from 'src/app/shared/guard/role-manager-guard.service';
import { RoleProviderGuard } from 'src/app/shared/guard/role-provider-guard.service';
import { RoleProviderDirectorGuard } from 'src/app/shared/guard/role-providerDirector-guard.service';
import { RoleRevisorGuard } from 'src/app/shared/guard/role-revisor-guard.service';
import { AtendidaComponent } from './attended/atendida.component';
import { CrearTipoInsumoComponent } from './create-supplie-type/crear-tipo-insumo.component';
import { EntregarComponent } from './make-delivery-manager/entregar.component';
import { IntegracionComponent } from './integration/integracion.component';
import { IntegrationsPossiblesComponent } from './integrations-possibles/integrations-possibles.component';
import { IntegrationsRunningComponent } from './integrations-running/integrations-running.component';
import { CargueComponent } from './load-supplies/cargue.component';
import { RevisionesPendientesComponent } from './pending-reviews/revisiones-pendientes.component';
import { SolicitudComponent } from './providers-request/solicitud.component';
import { SolicitudesAtendidasComponent } from './requests-attended-provider/solicitudes-atendidas.component';
import { SolicitudesComponent } from './requests-manager/solicitudes.component';
import { RevisionPendienteComponent } from './review-pending/revision-pendiente.component';
import { SearchComponent } from './search/search.component';
import { BuscarSolicitudComponent } from './search-request/buscar-solicitud.component';
import { DeliveryManagerComponent } from './delivery-manager/delivery-manager.component';
import { DeliveriesManagerComponent } from './deliveries-manager/deliveries-manager.component';

const routes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'solicitudes/pendientes',
    component: SolicitudesComponent,
    canActivate: [RoleProviderGuard],
  },
  {
    path: 'solicitudes/pendientes/cargar/:idInsumo',
    component: CargueComponent,
    canActivate: [RoleProviderGuard],
  },
  {
    path: 'integracion',
    component: IntegracionComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'buscar',
    component: SearchComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'buscar-solicitud',
    component: BuscarSolicitudComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'realizar-entrega',
    component: EntregarComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'solicitudes/atendidas',
    component: SolicitudesAtendidasComponent,
    canActivate: [RoleProviderGuard],
  },
  {
    path: 'solicitudes/atendidas/ver/:idInsumo',
    component: AtendidaComponent,
    canActivate: [RoleProviderGuard],
  },
  {
    path: 'caracterizacion/insumo',
    component: CrearTipoInsumoComponent,
    canActivate: [RoleProviderDirectorGuard],
  },
  {
    path: 'integraciones-corriendo',
    component: IntegrationsRunningComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'integraciones-posibles',
    component: IntegrationsPossiblesComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'revisiones-pendientes',
    component: RevisionesPendientesComponent,
    canActivate: [RoleRevisorGuard],
  },
  {
    path: 'revisiones-pendientes/registros/:supplyRequestedId',
    component: RevisionPendienteComponent,
    canActivate: [RoleRevisorGuard],
  },
  {
    path: 'entregas-realizadas',
    component: DeliveriesManagerComponent,
    canActivate: [RoleManagerGuard],
  },
  {
    path: 'entregas-realizadas/:deliveryId',
    component: DeliveryManagerComponent,
    canActivate: [RoleManagerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosRoutingModule {}
