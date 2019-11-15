import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedComponent } from './access-denied.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    AccessDeniedRoutingModule, 
    NgxSpinnerModule
  ],
  declarations: [AccessDeniedComponent]
})
export class AccessDeniedModule { }
