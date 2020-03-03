import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadSuppliesComponent } from './download-supplies/download-supplies.component';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperacionRoutingModule } from './operacion-routing.module';



@NgModule({
  declarations: [DownloadSuppliesComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    OperacionRoutingModule
  ]
})
export class OperacionModule { }
