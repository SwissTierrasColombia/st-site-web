import { MakeDeliveryManagerComponent } from './make-delivery-manager/make-delivery-manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductDeliveryComponent } from './add-product-delivery/add-product-delivery.component';
import { TabsDeliveriesComponent } from './tabs-deliveries/tabs-deliveries.component';

const routes: Routes = [
  {
    path: 'hacer-entrega-gestor',
    component: MakeDeliveryManagerComponent,
  },
  {
    path: 'buscar-entregas',
    component: TabsDeliveriesComponent,
  },
  {
    path: 'entrega/:deliveryId',
    component: AddProductDeliveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityModuleRoutingModule {}
