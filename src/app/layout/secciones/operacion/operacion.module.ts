import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperacionRoutingModule } from './operacion-routing.module';
import { DeliveriesSuppliesComponent } from './deliveries-supplies/deliveries-supplies.component';
import { DownloadSuppliesComponent } from './download-supplies/download-supplies.component';
import { DialogBoxComponent } from '../../bs-component/components/dialog-box/dialog-box.component';


@NgModule({
  declarations: [
    DeliveriesSuppliesComponent,
    DownloadSuppliesComponent,
    DialogBoxComponent // Componente Modal

  ],
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    OperacionRoutingModule
  ]
})
export class OperacionModule { }
