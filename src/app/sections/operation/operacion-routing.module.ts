import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesSuppliesComponent } from './downloads-pending/deliveries-supplies.component';
import { DownloadSuppliesComponent } from './download-supplie/download-supplies.component';
import { EntregasAtendidasComponent } from './downloads-made/entregas-atendidas.component';
import { EntregaAtendidaComponent } from './download-done/entrega-atendida.component';

const routes: Routes = [
  {
    path: 'descargas',
    component: DeliveriesSuppliesComponent,
  },
  {
    path: 'descarga/:IdEntrega/insumo',
    component: DownloadSuppliesComponent,
  },
  {
    path: 'descargas-realizadas',
    component: EntregasAtendidasComponent,
  },
  {
    path: 'descarga/:IdEntrega/realizada',
    component: EntregaAtendidaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperacionRoutingModule {}
