import { MakeDeliveryManagerComponent } from './make-delivery-manager/make-delivery-manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDeliveriesComponent } from './view-deliveries/view-deliveries.component';

const routes: Routes = [
  {
    path: 'hacer-entrega-gestor',
    component: MakeDeliveryManagerComponent,
  },
  {
    path: 'buscar-entregas',
    component: ViewDeliveriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityModuleRoutingModule {}
