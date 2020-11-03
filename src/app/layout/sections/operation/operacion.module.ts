import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperacionRoutingModule } from './operacion-routing.module';
import { BsComponentModule } from '../../bs-component/bs-component.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveriesSuppliesComponent } from './downloads-pending/deliveries-supplies.component';
import { DownloadSuppliesComponent } from './download-supplie/download-supplies.component';
import { EntregasAtendidasComponent } from './downloads-made/entregas-atendidas.component';
import { EntregaAtendidaComponent } from './download-done/entrega-atendida.component';
@NgModule({
  declarations: [
    DeliveriesSuppliesComponent,
    DownloadSuppliesComponent,
    EntregasAtendidasComponent,
    EntregaAtendidaComponent,
  ],
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    OperacionRoutingModule,
    BsComponentModule,
    NgbModule
  ],
  bootstrap: [DownloadSuppliesComponent]
})
export class OperacionModule { }
