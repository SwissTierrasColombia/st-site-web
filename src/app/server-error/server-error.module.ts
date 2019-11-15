import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerErrorRoutingModule } from './server-error-routing.module';
import { ServerErrorComponent } from './server-error.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    ServerErrorRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [ServerErrorComponent]
})
export class ServerErrorModule { }
