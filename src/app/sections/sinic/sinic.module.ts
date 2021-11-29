import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PageHeaderModule } from 'src/app/shared';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { SinicRoutingModule } from './SinicRoutingModule';
import { FindDeliveriesComponent } from './find-deliveries/find-deliveries.component';
import { TabsDeliveriesComponent } from './tabs-deliveries/tabs-deliveries.component';
@NgModule({
  declarations: [CreateDeliveryComponent, FindDeliveriesComponent, TabsDeliveriesComponent],
  imports: [
    CommonModule,
    SinicRoutingModule,
    CommonModule,
    NgbModule,
    PageHeaderModule,
    ComponentsModule,
    FormsModule,
    NgxSpinnerModule,
  ],
})
export class SinicModule {}
