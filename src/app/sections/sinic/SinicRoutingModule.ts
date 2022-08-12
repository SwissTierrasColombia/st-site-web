import { DeliveryParameterizationComponent } from './delivery-parameterization/delivery-parameterization.component';
import { CreatePeriodsComponent } from './create-periods/create-periods.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { FlatFileDeliveryComponent } from './flat-file-delivery/flat-file-delivery.component';
import { TabsDeliveriesComponent } from './tabs-deliveries/tabs-deliveries.component';

const routes: Routes = [
  {
    path: 'crear-entrega',
    component: CreateDeliveryComponent,
    canActivate: [],
  },
  {
    path: 'listar-entregas/:tab',
    component: TabsDeliveriesComponent,
    canActivate: [],
  },
  {
    path: 'listar-entregas/:tab/entrega/:deliveryId',
    component: DeliveryComponent,
    canActivate: [],
  },
  {
    path: 'listar-entregas/:tab/entrega-archivo-plano/:deliveryId',
    component: FlatFileDeliveryComponent,
    canActivate: [],
  },
  {
    path: 'grupos',
    component: CreateGroupComponent,
    canActivate: [],
  },
  {
    path: 'ciclos',
    component: CreatePeriodsComponent,
    canActivate: [],
  },
  {
    path: 'ciclos/:cycleId/periodos',
    component: DeliveryParameterizationComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinicRoutingModule { }
