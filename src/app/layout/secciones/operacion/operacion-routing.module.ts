import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadSuppliesComponent } from './download-supplies/download-supplies.component';

const routes: Routes = [
  {
    path: 'download',
    component: DownloadSuppliesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionRoutingModule { }
