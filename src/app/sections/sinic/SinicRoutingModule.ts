import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { DeliveryComponent } from './delivery/delivery.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],
})
export class SinicRoutingModule { }
