import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesSuppliesComponent } from './deliveries-supplies/deliveries-supplies.component';
import { DownloadSuppliesComponent } from './download-supplies/download-supplies.component';


const routes: Routes = [
  {
    path: 'entregas',
    component: DeliveriesSuppliesComponent
  },
  {
    path: 'entrega/:IdEntrega/descargar',
    component: DownloadSuppliesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionRoutingModule { }
