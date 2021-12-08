import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductDeliveryComponent } from './add-product-delivery/add-product-delivery.component';
import { TabsDeliveriesComponent } from './tabs-deliveries/tabs-deliveries.component';
import { RoleOperatorGuard } from 'src/app/shared/guard/role-operator-guard.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { MakeDeliveryManagerComponent } from './make-delivery-manager/make-delivery-manager.component';

const routes: Routes = [
  {
    path: 'hacer-entrega-gestor',
    component: MakeDeliveryManagerComponent,
    canActivate: [RoleOperatorGuard],
  },
  {
    path: 'buscar-entregas/:tab',
    component: TabsDeliveriesComponent,
  },
  {
    path: ':tab/entrega/:deliveryId',
    component: AddProductDeliveryComponent,
  },
  {
    path: 'crear-producto',
    component: CreateProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevCatReceptionRoutingModule {}
