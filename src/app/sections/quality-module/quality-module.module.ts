import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeDeliveryManagerComponent } from './make-delivery-manager/make-delivery-manager.component';
import { QualityModuleRoutingModule } from './quality-module-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ViewDeliveriesComponent } from './view-deliveries/view-deliveries.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProductDeliveryComponent } from './add-product-delivery/add-product-delivery.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MakeDeliveryManagerComponent,
    ViewDeliveriesComponent,
    AddProductDeliveryComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    QualityModuleRoutingModule,
    PageHeaderModule,
    ComponentsModule,
    FormsModule,
  ],
})
export class QualityModuleModule {}
