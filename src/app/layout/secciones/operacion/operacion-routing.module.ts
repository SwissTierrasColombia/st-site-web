import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesSuppliesComponent } from './descargas-pendientes/deliveries-supplies.component';
import { DownloadSuppliesComponent } from './descargar-insumo/download-supplies.component';
import { EntregasAtendidasComponent } from './descargas-realizadas/entregas-atendidas.component';
import { EntregaAtendidaComponent } from './descarga-realizada/entrega-atendida.component';


const routes: Routes = [
  {
    path: 'descargas',
    component: DeliveriesSuppliesComponent
  },
  {
    path: 'descarga/:IdEntrega/insumo',
    component: DownloadSuppliesComponent
  },
  {
    path: 'descargas-realizadas',
    component: EntregasAtendidasComponent
  },
  {
    path: 'descarga/:IdEntrega/realizada',
    component: EntregaAtendidaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionRoutingModule { }
