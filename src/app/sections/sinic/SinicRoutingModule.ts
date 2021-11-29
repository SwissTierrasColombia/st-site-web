import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';

const routes: Routes = [
  {
    path: 'crear-entrega',
    component: CreateDeliveryComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],
})
export class SinicRoutingModule {}
