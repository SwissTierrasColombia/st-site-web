import { NgSelect2Module } from 'ng-select2';
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
import { DeliveryComponent } from './delivery/delivery.component';
import { SinicFileUploadComponent } from './sinic-file-upload/sinic-file-upload.component';
import { FlatFileDeliveryComponent } from './flat-file-delivery/flat-file-delivery.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CreatePeriodsComponent } from './create-periods/create-periods.component';
import { DeliveryParameterizationComponent } from './delivery-parameterization/delivery-parameterization.component';
@NgModule({
  declarations: [
    CreateDeliveryComponent,
    FindDeliveriesComponent,
    TabsDeliveriesComponent,
    DeliveryComponent,
    FlatFileDeliveryComponent,
    SinicFileUploadComponent,
    CreateGroupComponent,
    CreatePeriodsComponent,
    DeliveryParameterizationComponent,
  ],
  imports: [
    CommonModule,
    SinicRoutingModule,
    CommonModule,
    NgbModule,
    PageHeaderModule,
    ComponentsModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelect2Module,
  ],
})
export class SinicModule {}
